import React from "react";
import {
  Title,
  Card,
  Table,
  Textarea,
  Stack,
  TableScrollContainer,
  LoadingOverlay,
  Badge,
  Button,
  Grid,
  Select,
  TagsInput,
  TextInput,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { GetUserDto, UpdateUserDto } from "../../Apis/types/userDtos/userDtos";
import {
  IconCheck,
  IconX,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import userController from "../../Apis/controllers/userController";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetAppointmentDto } from "../../Apis/types/appointmentDtos/appointmentDtos";
import { statusColors } from "../../Apis/enums/AppointmentStatus";
import { DatePickerInput } from "@mantine/dates";

const Profile = ({
  user,
  userAppointments,
}: {
  user: GetUserDto;
  userAppointments: GetAppointmentDto[];
}) => {
  const { t } = useTranslation("profile");
  const router = useRouter();
  const currentLang = router.locale;
  const isRTL = currentLang === "ar";

  const schema = z.object({
    userName: z
      .string()
      .min(1, { message: t("validation.user_Name_required") }),
    firstName: z
      .string()
      .min(1, { message: t("validation.first_name_required") }),
    lastName: z
      .string()
      .min(1, { message: t("validation.last_name_required") }),
    phoneNumber: z
      .string()
      .min(1, { message: t("validation.phone_required") })
      .regex(/^\+?[0-9]{10,15}$/, {
        message: t("validation.phone_invalid"),
      }),
    bio: z.string().optional(),
    occupation: z.string().optional(),
    location: z.string().optional(),
    interests: z.array(z.string()).optional(),
    gender: z.string().min(1, { message: t("validation.gender_required") }),
    dateOfBirth: z
      .date({
        required_error: t("validation.birth_date_required"),
        invalid_type_error: t("validation.birth_date_required"),
      })
      .refine(
        (date) => {
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          const monthDiff = today.getMonth() - date.getMonth();
          const dayDiff = today.getDate() - date.getDate();
          return (
            age > 13 ||
            (age === 13 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
          );
        },
        { message: t("validation.age_minimum") }
      ),
  });

  const form = useForm({
    initialValues: {
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      bio: user.bio ?? "",
      occupation: user.occupation ?? "",
      location: user.location ?? "",
      interests: user.interests || [],
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
    },

    validate: (values) => {
      try {
        schema.parse(values);
        return {};
      } catch (e) {
        const errors: Record<string, string> = {};
        if (typeof e === "object" && e !== null && "errors" in e) {
          const zodError = e as z.ZodError;
          zodError.errors.forEach((err) => {
            if (err.path && err.path.length > 0) {
              errors[err.path[0] as string] = err.message;
            }
          });
        }
        return errors;
      }
    },

    validateInputOnBlur: true,
  });

  const showSuccessNotification = (message: string) => {
    notifications.show({
      id: "register-success",
      title: t("notifications.success_title"),
      message: t(message),
      color: "green",
      icon: <IconCheck size={16} />,
      autoClose: 3000,
      withCloseButton: true,
      withBorder: true,
    });
  };

  const showErrorNotification = (message: string) => {
    notifications.show({
      id: "register-error",
      title: t("notifications.error_title"),
      message: t(message),
      color: "red",
      icon: <IconX size={16} />,
      autoClose: 3000,
      withCloseButton: true,
      withBorder: true,
    });
  };

  const updateUserDataMutation = useMutation({
    mutationFn: ({
      id,
      updateUserDto,
    }: {
      id: string;
      updateUserDto: UpdateUserDto;
    }) => userController.updateUser(id, updateUserDto),
    onSuccess: () => {
      showSuccessNotification("notifications.profile_updated");

      setTimeout(() => {
        router.push(`/${currentLang}/profile`);
      }, 1500);
    },
    onError: () => {
      showErrorNotification("notifications.error_updating_profile");
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    if (!values.dateOfBirth) {
      form.setFieldError("dateOfBirth", t("validation.birth_date_required"));
      return;
    }

    const registerUserDto: UpdateUserDto = {
      userName: values.userName,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      bio: values.bio,
      occupation: values.occupation,
      location: values.location,
      interests: values.interests,
    };

    updateUserDataMutation.mutate({
      id: user.id,
      updateUserDto: registerUserDto,
    });
  };

  console.log(userAppointments);
  return (
    <>
      {updateUserDataMutation.isPending ? (
        <LoadingOverlay />
      ) : (
        <Stack p="md" dir={isRTL ? "rtl" : "ltr"}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              {t("title")}
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label={t("fields.username")}
                {...form.getInputProps("userName")}
                leftSection={<IconUser size={16} />}
                mb="md"
              />

              <TextInput
                label={t("fields.email")}
                {...form.getInputProps("email")}
                mb="md"
              />

              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label={t("fields.firstName")}
                    {...form.getInputProps("firstName")}
                    error={form.errors.firstName}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label={t("fields.lastName")}
                    {...form.getInputProps("lastName")}
                    error={form.errors.lastName}
                  />
                </Grid.Col>
              </Grid>

              <DatePickerInput
                label={t("fields.birthDate")}
                {...form.getInputProps("dateOfBirth")}
                leftSection={<IconCalendar size={16} />}
                mb="md"
                error={form.errors.dateOfBirth}
                valueFormat="YYYY-MM-DD"
                nextIcon={<IconChevronRight size={16} />}
                previousIcon={<IconChevronLeft size={16} />}
              />

              <TextInput
                label={t("fields.phoneNumber")}
                leftSection={<IconPhone size={16} />}
                {...form.getInputProps("phoneNumber")}
                mt="md"
                error={form.errors.phoneNumber}
              />

              <Select
                w="100%"
                dir={isRTL ? "rtl" : "ltr"}
                p="md"
                label={t("genders.fields.gender")}
                placeholder={t("genders.placeholders.gender")}
                data={[
                  { value: "male", label: t("genders.male") },
                  { value: "female", label: t("genders.female") },
                  { value: "nonbinary", label: t("genders.nonbinary") },
                  { value: "transgender", label: t("genders.transgender") },
                  { value: "genderqueer", label: t("genders.genderqueer") },
                  { value: "agender", label: t("genders.agender") },
                  { value: "other", label: t("genders.other") },
                  {
                    value: "prefer_not_to_say",
                    label: t("genders.prefer_not_to_say"),
                  },
                ]}
                {...form.getInputProps("gender")}
                error={form.errors.gender}
                mb="md"
              />

              <Textarea
                label={t("fields.bio")}
                {...form.getInputProps("bio")}
                autosize
                minRows={2}
                mt="md"
              />

              <TextInput
                label={t("fields.occupation")}
                {...form.getInputProps("occupation")}
                mt="md"
              />

              <TextInput
                label={t("fields.location")}
                {...form.getInputProps("location")}
                mt="md"
              />

              <TagsInput
                label={t("fields.interests")}
                {...form.getInputProps("interests")}
                mt="md"
                placeholder={t("placeholders.interests")}
              />

              <Button
                disabled={updateUserDataMutation.isPending}
                color="gray"
                mt="md"
                type="submit"
              >
                {t("buttons.edit")}
              </Button>
            </form>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              {t("appointments.title")}
            </Title>
            <ScrollArea>
              <TableScrollContainer minWidth={800}>
                <Table verticalSpacing="md" striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>{t("appointments.fields.id")}</Table.Th>
                      <Table.Th>{t("appointments.fields.service")}</Table.Th>
                      <Table.Th>
                        {t("appointments.fields.propertyType")}
                      </Table.Th>
                      <Table.Th>{t("appointments.fields.date")}</Table.Th>
                      <Table.Th>{t("appointments.fields.time")}</Table.Th>
                      <Table.Th>{t("appointments.fields.status")}</Table.Th>
                      <Table.Th>{t("appointments.fields.createdAt")}</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {userAppointments.length > 0 ? (
                      userAppointments.map((appointment) => {
                        // appointment.status is a string like "Pending", "Confirmed", etc.
                        const statusString = appointment.status;
                        const badgeColor = statusColors[statusString] || "gray";

                        return (
                          <Table.Tr key={appointment.id}>
                            <Table.Td>{appointment.id}</Table.Td>
                            <Table.Td>
                              {t(
                                `appointments.services.${appointment.serviceType}`
                              )}
                            </Table.Td>
                            <Table.Td>
                              {appointment.propertyType || "-"}
                            </Table.Td>
                            <Table.Td>
                              {appointment.preferredDate
                                ? new Date(
                                    appointment.preferredDate
                                  ).toLocaleDateString()
                                : "-"}
                            </Table.Td>
                            <Table.Td>
                              {appointment.preferredTime || "-"}
                            </Table.Td>
                            <Table.Td>
                              <Badge color={badgeColor}>
                                {t(`status.${statusString}`)}
                              </Badge>
                            </Table.Td>
                            <Table.Td>
                              {appointment.createdAt
                                ? new Date(
                                    appointment.createdAt
                                  ).toLocaleString()
                                : "-"}
                            </Table.Td>
                          </Table.Tr>
                        );
                      })
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={7} style={{ textAlign: "center" }}>
                          {t("appointments.no_appointments")}
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </TableScrollContainer>
            </ScrollArea>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default Profile;
