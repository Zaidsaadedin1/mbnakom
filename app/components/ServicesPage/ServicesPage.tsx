import React from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Card,
  Grid,
  List,
  Button,
  Paper,
  Box,
  ThemeIcon,
  Divider,
} from "@mantine/core";
import {
  IconDental,
  IconFaceId,
  IconLinkPlus,
  IconMassage,
  IconClock,
  IconPhone,
  IconCalendar,
  IconEmergencyBed,
  IconHome,
  IconUserCheck,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CallNowButton from "../../blocks/CallNowButton/CallNowButton";

const ServicesPage = () => {
  const { t, i18n } = useTranslation("services");
  const router = useRouter();
  const isRTL = i18n.language === "ar";
  const currentLang = i18n.language;

  const services = [
    {
      id: "teeth-whitening",
      icon: IconDental,
      title: t("teeth_whitening_title"),
      description: t("teeth_whitening_description"),
      features: [
        t("teeth_whitening_feature_1"),
        t("teeth_whitening_feature_2"),
        t("teeth_whitening_feature_3"),
      ],
      duration: t("teeth_whitening_duration"),
    },
    {
      id: "dental-botox",
      icon: IconFaceId,
      title: t("dental_botox_title"),
      description: t("dental_botox_description"),
      features: [
        t("dental_botox_feature_1"),
        t("dental_botox_feature_2"),
        t("dental_botox_feature_3"),
      ],
      duration: t("dental_botox_duration"),
    },
    {
      id: "facial-fillers",
      icon: IconLinkPlus,
      title: t("facial_fillers_title"),
      description: t("facial_fillers_description"),
      features: [
        t("facial_fillers_feature_1"),
        t("facial_fillers_feature_2"),
        t("facial_fillers_feature_3"),
      ],
      duration: t("facial_fillers_duration"),
    },
    {
      id: "veneers",
      icon: IconDental,
      title: t("veneers_title"),
      description: t("veneers_description"),
      features: [
        t("veneers_feature_1"),
        t("veneers_feature_2"),
        t("veneers_feature_3"),
      ],
      duration: t("veneers_duration"),
    },
    {
      id: "laser-treatments",
      icon: IconMassage,
      title: t("laser_treatments_title"),
      description: t("laser_treatments_description"),
      features: [
        t("laser_treatments_feature_1"),
        t("laser_treatments_feature_2"),
        t("laser_treatments_feature_3"),
      ],
      duration: t("laser_treatments_duration"),
    },
    {
      id: "dental-implants",
      icon: IconDental,
      title: t("dental_implants_title"),
      description: t("dental_implants_description"),
      features: [
        t("dental_implants_feature_1"),
        t("dental_implants_feature_2"),
        t("dental_implants_feature_3"),
      ],
      duration: t("dental_implants_duration"),
    },
  ];

  const emergencyServices = [
    {
      icon: IconEmergencyBed,
      title: t("emergency_dental"),
      description: t("emergency_dental_description"),
      contact: t("emergency_phone"),
    },
    {
      icon: IconPhone,
      title: t("after_hours"),
      description: t("after_hours_description"),
      contact: t("after_hours_number"),
    },
    {
      icon: IconHome,
      title: t("home_visits"),
      description: t("home_visits_description"),
      contact: t("home_visits_contact"),
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Container size="lg" py="xl">
        {/* Header */}
        <Paper p="xl" mb="xl" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={60} variant="light">
              <IconDental size={30} />
            </ThemeIcon>
            <Title order={1} ta="center">
              {t("page_title")}
            </Title>
            <Text size="lg" ta="center" c="dimmed" maw={600}>
              {t("page_description")}
            </Text>
          </Stack>
        </Paper>

        {/* Main Services */}
        <Stack gap="xl">
          <Box>
            <Title order={2} mb="lg" ta={isRTL ? "right" : "left"}>
              {t("main_services_title")}
            </Title>
            <Grid>
              {services.map((service) => (
                <Grid.Col key={service.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <Card p="lg" h="100%" shadow="sm" withBorder>
                    <Stack gap="md" h="100%">
                      <Group>
                        <ThemeIcon size={40} variant="light">
                          <service.icon size={20} />
                        </ThemeIcon>
                        <Box flex={1}>
                          <Title order={4}>{service.title}</Title>
                        </Box>
                      </Group>

                      <Text size="sm" c="dimmed" flex={1}>
                        {service.description}
                      </Text>

                      <Box>
                        <Text size="sm" fw={600} mb="xs">
                          {t("service_features")}:
                        </Text>
                        <List spacing="xs" size="sm">
                          {service.features.map((feature, index) => (
                            <List.Item key={index}>{feature}</List.Item>
                          ))}
                        </List>
                      </Box>

                      <Group justify="space-between" mt="auto">
                        <Group gap="xs">
                          <IconClock size={16} />
                          <Text size="xs" c="dimmed">
                            {service.duration}
                          </Text>
                        </Group>
                      </Group>

                      <Button
                        variant="light"
                        fullWidth
                        onClick={() =>
                          router.push(
                            `/${currentLang}/appointments?service=${service.id}`
                          )
                        }
                      >
                        {t("book_appointment")}
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Box>

          <Divider />

          {/* Emergency Services */}
          <Box>
            <Group mb="lg">
              <ThemeIcon size={32} variant="light">
                <IconEmergencyBed size={18} />
              </ThemeIcon>
              <Title order={2}>{t("emergency_services_title")}</Title>
            </Group>

            <Text size="md" mb="lg" c="dimmed" ta={isRTL ? "right" : "left"}>
              {t("emergency_services_description")}
            </Text>

            <Grid>
              {emergencyServices.map((service, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                  <Card p="md" withBorder>
                    <Group mb="sm">
                      <ThemeIcon size={32} variant="light">
                        <service.icon size={16} />
                      </ThemeIcon>
                      <Text fw={600}>{service.title}</Text>
                    </Group>
                    <Text size="sm" c="dimmed" mb="sm">
                      {service.description}
                    </Text>
                    <Text size="sm" fw={600}>
                      {service.contact}
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Box>

          <Divider />

          {/* Service Process */}
          <Box>
            <Title order={2} mb="lg" ta={isRTL ? "right" : "left"}>
              {t("service_process_title")}
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Card p="md" ta="center" withBorder>
                  <ThemeIcon size={40} variant="light" mx="auto" mb="sm">
                    <IconCalendar size={20} />
                  </ThemeIcon>
                  <Text fw={600} mb="xs">
                    {t("step_1_title")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("step_1_description")}
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Card p="md" ta="center" withBorder>
                  <ThemeIcon size={40} variant="light" mx="auto" mb="sm">
                    <IconUserCheck size={20} />
                  </ThemeIcon>
                  <Text fw={600} mb="xs">
                    {t("step_2_title")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("step_2_description")}
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Card p="md" ta="center" withBorder>
                  <ThemeIcon size={40} variant="light" mx="auto" mb="sm">
                    <IconDental size={20} />
                  </ThemeIcon>
                  <Text fw={600} mb="xs">
                    {t("step_3_title")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("step_3_description")}
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Card p="md" ta="center" withBorder>
                  <ThemeIcon size={40} variant="light" mx="auto" mb="sm">
                    <IconFaceId size={20} />
                  </ThemeIcon>
                  <Text fw={600} mb="xs">
                    {t("step_4_title")}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t("step_4_description")}
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Call to Action */}
          <Paper p="xl" withBorder ta="center">
            <Stack gap="md" align="center">
              <Title order={3}>{t("cta_title")}</Title>
              <Text size="lg" maw={600}>
                {t("cta_description")}
              </Text>
              <Group>
                <Button
                  size="lg"
                  onClick={() => router.push(`/${currentLang}/appointments`)}
                >
                  {t("book_appointment")}
                </Button>
                <CallNowButton />
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
};

export default ServicesPage;
