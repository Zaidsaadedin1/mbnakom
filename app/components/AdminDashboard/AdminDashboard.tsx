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
} from "@mantine/core";
import { IconSearch, IconUser, IconCalendarEvent } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { GetUserDto } from "../../Apis/types/userDtos/userDtos";
import { GetAppointmentForAdminDto } from "../../Apis/types/appointmentDtos/appointmentDtos";
import { AppointmentStatus } from "../../Apis/enums/AppointmentStatus";

type DoctorDashboardProps = {
  users: GetUserDto[];
  appointments: GetAppointmentForAdminDto[];
  loading?: boolean;
};

function AdminDashboard({
  users = [],
  appointments = [],
  loading = false,
}: DoctorDashboardProps) {
  const { t } = useTranslation("doctorDashboard");
  const [searchUser, setSearchUser] = React.useState("");
  const [searchAppointment, setSearchAppointment] = React.useState("");
  const [usersPage, setUsersPage] = React.useState(1);
  const [appointmentsPage, setAppointmentsPage] = React.useState(1);
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
      () => new Date(new Date()).getMonth() === new Date().getMonth()
    ).length,
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
                <Table.Th>{t("users.fields.gender")}</Table.Th>
                <Table.Th>{t("users.fields.birthDate")}</Table.Th>
                <Table.Th>{t("users.fields.occupation")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{`${user.firstName} ${user.lastName}`}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>{user.phoneNumber}</Table.Td>
                    <Table.Td>{user.gender}</Table.Td>
                    <Table.Td>
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </Table.Td>
                    <Table.Td>{user.occupation || "-"}</Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center" }}>
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
      {/* // Appointments Table Section - Fixed Version */}
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
                <Table.Th>{t("appointments.fields.patient")}</Table.Th>
                <Table.Th>{t("appointments.fields.service")}</Table.Th>
                <Table.Th>{t("appointments.fields.date")}</Table.Th>
                <Table.Th>{t("appointments.fields.time")}</Table.Th>
                <Table.Th>{t("appointments.fields.status")}</Table.Th>
                <Table.Th>{t("appointments.fields.medicalHistory")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((appointment) => (
                  <Table.Tr key={appointment.id}>
                    <Table.Td>{`${appointment.firstName} ${appointment.lastName}`}</Table.Td>
                    <Table.Td>{appointment.serviceType}</Table.Td>
                    <Table.Td>
                      {new Date(appointment.preferredDate).toLocaleDateString()}
                    </Table.Td>
                    <Table.Td>
                      {appointment.preferredTime === "morning"
                        ? t("time.morning")
                        : appointment.preferredTime === "afternoon"
                        ? t("time.afternoon")
                        : appointment.preferredTime}
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light">
                        {t(`status.${appointment.status}`)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text lineClamp={1} style={{ maxWidth: 200 }}>
                        {appointment.medicalHistory || "-"}
                      </Text>
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
    </Stack>
  );
}

export default AdminDashboard;
