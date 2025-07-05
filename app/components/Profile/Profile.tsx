import React, { useState, useEffect } from "react";
import {
  Grid,
  TextInput,
  Button,
  Title,
  Card,
  Table,
  Textarea,
  TagsInput,
  Stack,
  TableScrollContainer,
  Select,
  LoadingOverlay,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { GetUserDto, UpdateUserDto } from "../../Apis/types/userDtos/userDtos";
import { DatePickerInput } from "@mantine/dates";
import {
  IconUser,
  IconPhone,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { appointmentController } from "../../Apis/controllers/appointmentControllers";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import userController from "../../Apis/controllers/userController";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GetAppointmentDto } from "../../Apis/types/appointmentDtos/appointmentDtos";
import {
  AppointmentStatus,
  statusColors,
} from "../../Apis/enums/AppointmentStatus";

const Profile = ({ user }: { user: GetUserDto }) => {
  const { t } = useTranslation("profile");
  const router = useRouter();
  const currentLang = router.locale;
  const isRTL = currentLang === "ar";
  const [userOrders, setUserOrders] = useState<GetAppointmentDto[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await appointmentController.GetAllUserAppointmentAsync(
          user.id
        );
        if (res) {
          setUserOrders(res.data ?? []);
        } else {
          setUserOrders([]);
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setUserOrders([]);
      }
    };

    fetchUserOrders();
  }, [user.id]);

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
            <TableScrollContainer minWidth={400}>
              <Table verticalSpacing="xl" striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.id")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.firstName")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.lastName")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.email")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.phone")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.serviceType")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.preferredDate")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.preferredTime")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.concerns")}
                    </Table.Th>
                    <Table.Th
                      style={{ whiteSpace: "nowrap", paddingRight: 16 }}
                    >
                      {t("table.status")}
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {userOrders.length > 0 ? (
                    userOrders.map((appointment) => {
                      const statusEnumValue =
                        AppointmentStatus[
                          appointment.status as unknown as keyof typeof AppointmentStatus
                        ];

                      const statusKey =
                        typeof statusEnumValue === "string"
                          ? statusEnumValue
                          : statusEnumValue?.toString().toLowerCase() || "";
                      const badgeColor = statusColors[statusKey] || "yellow";

                      return (
                        <Table.Tr key={appointment.id}>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.id}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.firstName}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.lastName}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.email}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.phone}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.serviceType}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {new Date(
                              appointment.preferredDate
                            ).toLocaleDateString()}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.preferredTime}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.concerns}
                          </Table.Td>
                          <Table.Td style={{ paddingRight: 16 }}>
                            {appointment.status !== undefined ? (
                              <Badge color={badgeColor}>
                                {t(`status.${statusKey}`)}
                              </Badge>
                            ) : (
                              "-"
                            )}
                          </Table.Td>
                        </Table.Tr>
                      );
                    })
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={10} style={{ textAlign: "center" }}>
                        {t("table.no_appointments")}
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </TableScrollContainer>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default Profile;
