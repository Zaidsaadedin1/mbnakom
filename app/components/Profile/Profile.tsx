import React, { useState, useEffect } from "react";
import {
  Title,
  Card,
  Table,
  Textarea,
  Stack,
  TableScrollContainer,
  LoadingOverlay,
  Badge,
  Group,
  ActionIcon,
  Modal,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { GetUserDto, UpdateUserDto } from "../../Apis/types/userDtos/userDtos";
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";
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
import { useDisclosure } from "@mantine/hooks";

const Profile = ({ user }: { user: GetUserDto }) => {
  const { t } = useTranslation("profile");
  const router = useRouter();
  const currentLang = router.locale;
  const isRTL = currentLang === "ar";
  const [userAppointments, setUserAppointments] = useState<GetAppointmentDto[]>(
    []
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<GetAppointmentDto | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const res = await appointmentController.GetAllUserAppointmentAsync(
          user.id
        );
        if (res) {
          setUserAppointments(res.data ?? []);
        } else {
          setUserAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching user appointments:", error);
        setUserAppointments([]);
      }
    };

    fetchUserAppointments();
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

  const handleViewDetails = (appointment: GetAppointmentDto) => {
    setSelectedAppointment(appointment);
    open();
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
              {/* ... (keep all the existing form fields) ... */}
            </form>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              {t("appointments.title")}
            </Title>
            <TableScrollContainer minWidth={800}>
              <Table verticalSpacing="md" striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{t("appointments.fields.service")}</Table.Th>
                    <Table.Th>{t("appointments.fields.propertyType")}</Table.Th>
                    <Table.Th>{t("appointments.fields.date")}</Table.Th>
                    <Table.Th>{t("appointments.fields.status")}</Table.Th>
                    <Table.Th>{t("appointments.fields.actions")}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {userAppointments.length > 0 ? (
                    userAppointments.map((appointment) => {
                      const statusString = AppointmentStatus[appointment.status]
                        .toString()
                        .toLowerCase();
                      const badgeColor = statusColors[statusString] || "yellow";

                      return (
                        <Table.Tr key={appointment.id}>
                          <Table.Td>{appointment.serviceType}</Table.Td>
                          <Table.Td>{appointment.propertyType || "-"}</Table.Td>
                          <Table.Td>
                            {new Date(
                              appointment.preferredDate
                            ).toLocaleDateString()}
                            <Text size="sm" c="dimmed">
                              {appointment.preferredTime}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge color={badgeColor}>
                              {t(`status.${statusString}`)}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon
                                variant="subtle"
                                onClick={() => handleViewDetails(appointment)}
                              >
                                <IconInfoCircle size={18} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                        {t("appointments.no_appointments")}
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </TableScrollContainer>
          </Card>

          {/* Appointment Details Modal */}
          <Modal
            opened={opened}
            onClose={close}
            title={t("appointments.details_title")}
            size="lg"
          >
            {selectedAppointment && (
              <Stack>
                <Group>
                  <Text fw={500}>{t("appointments.fields.service")}:</Text>
                  <Text>{selectedAppointment.serviceType}</Text>
                </Group>
                <Group>
                  <Text fw={500}>{t("appointments.fields.propertyType")}:</Text>
                  <Text>{selectedAppointment.propertyType || "-"}</Text>
                </Group>
                <Group>
                  <Text fw={500}>{t("appointments.fields.date")}:</Text>
                  <Text>
                    {new Date(
                      selectedAppointment.preferredDate
                    ).toLocaleDateString()}
                  </Text>
                </Group>
                <Group>
                  <Text fw={500}>{t("appointments.fields.time")}:</Text>
                  <Text>{selectedAppointment.preferredTime}</Text>
                </Group>
                <Group>
                  <Text fw={500}>{t("appointments.fields.status")}:</Text>
                  <Badge
                    color={
                      statusColors[
                        AppointmentStatus[selectedAppointment.status]
                          .toString()
                          .toLowerCase()
                      ]
                    }
                  >
                    {t(
                      `status.${AppointmentStatus[selectedAppointment.status]
                        .toString()
                        .toLowerCase()}`
                    )}
                  </Badge>
                </Group>
                <Group>
                  <Text fw={500}>
                    {t("appointments.fields.projectDetails")}:
                  </Text>
                  <Textarea
                    value={selectedAppointment.projectDetails}
                    readOnly
                    autosize
                    minRows={3}
                  />
                </Group>
                {selectedAppointment.createdAt && (
                  <Group>
                    <Text fw={500}>{t("appointments.fields.createdAt")}:</Text>
                    <Text>
                      {new Date(selectedAppointment.createdAt).toLocaleString()}
                    </Text>
                  </Group>
                )}
              </Stack>
            )}
          </Modal>
        </Stack>
      )}
    </>
  );
};

export default Profile;
