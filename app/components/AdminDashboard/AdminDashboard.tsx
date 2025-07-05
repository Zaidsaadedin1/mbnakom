import React from "react";
import {
  Paper,
  Title,
  Table,
  Text,
  Stack,
  SimpleGrid,
  Card,
  Group,
  TextInput,
  Pagination,
  Badge,
  TableScrollContainer,
  Skeleton,
  Space,
  Tooltip,
  ActionIcon,
  Modal,
  Textarea,
} from "@mantine/core";
import {
  IconSearch,
  IconUser,
  IconCalendarEvent,
  IconInfoCircle,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { GetUserDto } from "../../Apis/types/userDtos/userDtos";
import { GetAppointmentForAdminDto } from "../../Apis/types/appointmentDtos/appointmentDtos";
import { AppointmentStatus } from "../../Apis/enums/AppointmentStatus";
import { useDisclosure } from "@mantine/hooks";

type AdminDashboardProps = {
  users: GetUserDto[];
  appointments: GetAppointmentForAdminDto[];
  loading?: boolean;
  onUpdateAppointment?: (id: number, status: AppointmentStatus) => void;
  onDeleteAppointment?: (id: number) => void;
};

function AdminDashboard({
  users = [],
  appointments = [],
  loading = false,
  onUpdateAppointment,
  onDeleteAppointment,
}: AdminDashboardProps) {
  const { t } = useTranslation("adminDashboard");
  const [searchUser, setSearchUser] = React.useState("");
  const [searchAppointment, setSearchAppointment] = React.useState("");
  const [usersPage, setUsersPage] = React.useState(1);
  const [appointmentsPage, setAppointmentsPage] = React.useState(1);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<GetAppointmentForAdminDto | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const searchTerm = searchUser.toLowerCase();
    return (
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm)
    );
  });

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const searchTerm = searchAppointment.toLowerCase();
    return (
      `${appointment.firstName} ${appointment.lastName}`
        .toLowerCase()
        .includes(searchTerm) ||
      appointment.serviceType.toLowerCase().includes(searchTerm) ||
      appointment.propertyType?.toLowerCase().includes(searchTerm) ||
      appointment.status.toString().toLowerCase().includes(searchTerm)
    );
  });

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    (usersPage - 1) * itemsPerPage,
    usersPage * itemsPerPage
  );

  // Paginate appointments
  const paginatedAppointments = filteredAppointments.slice(
    (appointmentsPage - 1) * itemsPerPage,
    appointmentsPage * itemsPerPage
  );

  // Statistics
  const stats = {
    totalUsers: users.length,
    totalAppointments: appointments.length,
    upcomingAppointments: appointments.filter(
      (a) =>
        new Date(a.preferredDate) > new Date() &&
        a.status === AppointmentStatus.Confirmed
    ).length,
    newUsersThisMonth: users.filter(
      (user) =>
        new Date(user.dateOfBirth).getMonth() === new Date().getMonth() &&
        new Date(user.dateOfBirth).getFullYear() === new Date().getFullYear()
    ).length,
  };

  const handleViewDetails = (appointment: GetAppointmentForAdminDto) => {
    setSelectedAppointment(appointment);
    open();
  };

  const handleStatusChange = (id: number, status: AppointmentStatus) => {
    if (onUpdateAppointment) {
      onUpdateAppointment(id, status);
    }
  };

  const handleDeleteAppointment = (id: number) => {
    if (onDeleteAppointment) {
      onDeleteAppointment(id);
    }
  };

  if (loading) {
    return (
      <Stack>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} width="70%" radius="xl" />
      </Stack>
    );
  }

  return (
    <Stack p="md">
      {/* Statistics Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Card withBorder>
          <Group>
            <IconUser size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.totalUsers")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.totalUsers}
              </Text>
            </div>
          </Group>
        </Card>

        <Card withBorder>
          <Group>
            <IconCalendarEvent size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.totalAppointments")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.totalAppointments}
              </Text>
            </div>
          </Group>
        </Card>

        <Card withBorder>
          <Group>
            <IconCalendarEvent size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.upcomingAppointments")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.upcomingAppointments}
              </Text>
            </div>
          </Group>
        </Card>

        <Card withBorder>
          <Group>
            <IconUser size={24} />
            <div>
              <Text size="sm" c="dimmed">
                {t("stats.newUsersThisMonth")}
              </Text>
              <Text size="xl" fw={500}>
                {stats.newUsersThisMonth}
              </Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Users Table */}
      <Paper p="md" shadow="sm" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>{t("users.title")}</Title>
          <TextInput
            placeholder={t("users.searchPlaceholder")}
            leftSection={<IconSearch size={16} />}
            value={searchUser}
            onChange={(e) => setSearchUser(e.currentTarget.value)}
            w={300}
          />
        </Group>

        <TableScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("users.fields.name")}</Table.Th>
                <Table.Th>{t("users.fields.email")}</Table.Th>
                <Table.Th>{t("users.fields.phone")}</Table.Th>
                <Table.Th>{t("users.fields.createdAt")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{`${user.firstName} ${user.lastName}`}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>{user.phoneNumber || "-"}</Table.Td>
                    <Table.Td>
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4} style={{ textAlign: "center" }}>
                    <Text c="dimmed">{t("users.noUsers")}</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </TableScrollContainer>

        <Space h="md" />
        <Pagination
          total={Math.ceil(filteredUsers.length / itemsPerPage)}
          value={usersPage}
          onChange={setUsersPage}
          siblings={1}
          boundaries={1}
        />
      </Paper>

      {/* Appointments Table */}
      <Paper p="md" shadow="sm" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>{t("appointments.title")}</Title>
          <TextInput
            placeholder={t("appointments.searchPlaceholder")}
            leftSection={<IconSearch size={16} />}
            value={searchAppointment}
            onChange={(e) => setSearchAppointment(e.currentTarget.value)}
            w={300}
          />
        </Group>

        <TableScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("appointments.fields.client")}</Table.Th>
                <Table.Th>{t("appointments.fields.service")}</Table.Th>
                <Table.Th>{t("appointments.fields.propertyType")}</Table.Th>
                <Table.Th>{t("appointments.fields.date")}</Table.Th>
                <Table.Th>{t("appointments.fields.status")}</Table.Th>
                <Table.Th>{t("appointments.fields.actions")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((appointment) => (
                  <Table.Tr key={appointment.id}>
                    <Table.Td>
                      {`${appointment.firstName} ${appointment.lastName}`}
                      <Text size="sm" c="dimmed">
                        {appointment.email}
                      </Text>
                    </Table.Td>
                    <Table.Td>{appointment.serviceType}</Table.Td>
                    <Table.Td>{appointment.propertyType || "-"}</Table.Td>
                    <Table.Td>
                      {new Date(appointment.preferredDate).toLocaleDateString()}
                      <Text size="sm" c="dimmed">
                        {appointment.preferredTime}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          appointment.status === AppointmentStatus.Confirmed
                            ? "green"
                            : appointment.status === AppointmentStatus.Pending
                            ? "yellow"
                            : "red"
                        }
                      >
                        {t(`status.${appointment.status}`)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label={t("appointments.viewDetails")}>
                          <ActionIcon
                            variant="subtle"
                            onClick={() => handleViewDetails(appointment)}
                          >
                            <IconInfoCircle size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label={t("appointments.edit")}>
                          <ActionIcon
                            variant="subtle"
                            onClick={() =>
                              handleStatusChange(
                                appointment.id,
                                AppointmentStatus.Confirmed
                              )
                            }
                          >
                            <IconEdit size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label={t("appointments.delete")}>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center" }}>
                    <Text c="dimmed">{t("appointments.noAppointments")}</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </TableScrollContainer>

        <Space h="md" />
        <Pagination
          total={Math.ceil(filteredAppointments.length / itemsPerPage)}
          value={appointmentsPage}
          onChange={setAppointmentsPage}
          siblings={1}
          boundaries={1}
        />
      </Paper>

      {/* Appointment Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={t("appointments.detailsTitle")}
        size="lg"
      >
        {selectedAppointment && (
          <Stack>
            <Group>
              <Text fw={500}>{t("appointments.fields.client")}:</Text>
              <Text>
                {selectedAppointment.firstName} {selectedAppointment.lastName}
              </Text>
            </Group>
            <Group>
              <Text fw={500}>{t("appointments.fields.email")}:</Text>
              <Text>{selectedAppointment.email}</Text>
            </Group>
            <Group>
              <Text fw={500}>{t("appointments.fields.phone")}:</Text>
              <Text>{selectedAppointment.phone}</Text>
            </Group>
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
                  selectedAppointment.status === AppointmentStatus.Confirmed
                    ? "green"
                    : selectedAppointment.status === AppointmentStatus.Pending
                    ? "yellow"
                    : "red"
                }
              >
                {t(`status.${selectedAppointment.status}`)}
              </Badge>
            </Group>
            <Group>
              <Text fw={500}>{t("appointments.fields.projectDetails")}:</Text>
              <Textarea
                value={selectedAppointment.projectDetails}
                readOnly
                autosize
                minRows={3}
                maxRows={6}
              />
            </Group>
            <Group>
              <Text fw={500}>{t("appointments.fields.createdAt")}:</Text>
              <Text>
                {new Date(selectedAppointment.createdAt).toLocaleString()}
              </Text>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}

export default AdminDashboard;
