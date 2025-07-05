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
  IconBuildingStore,
  IconToolsKitchen2,
  IconHomeEco,
  IconBath,
  IconPaint,
  IconHammer,
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
      id: "kitchen-renovation",
      icon: IconToolsKitchen2,
      title: t("kitchen_renovation_title"),
      description: t("kitchen_renovation_description"),
      features: [
        t("kitchen_renovation_feature_1"),
        t("kitchen_renovation_feature_2"),
        t("kitchen_renovation_feature_3"),
      ],
      duration: t("kitchen_renovation_duration"),
    },
    {
      id: "bathroom-remodeling",
      icon: IconBath,
      title: t("bathroom_remodeling_title"),
      description: t("bathroom_remodeling_description"),
      features: [
        t("bathroom_remodeling_feature_1"),
        t("bathroom_remodeling_feature_2"),
        t("bathroom_remodeling_feature_3"),
      ],
      duration: t("bathroom_remodeling_duration"),
    },
    {
      id: "interior-design",
      icon: IconHomeEco,
      title: t("interior_design_title"),
      description: t("interior_design_description"),
      features: [
        t("interior_design_feature_1"),
        t("interior_design_feature_2"),
        t("interior_design_feature_3"),
      ],
      duration: t("interior_design_duration"),
    },
    {
      id: "painting-services",
      icon: IconPaint,
      title: t("painting_services_title"),
      description: t("painting_services_description"),
      features: [
        t("painting_services_feature_1"),
        t("painting_services_feature_2"),
        t("painting_services_feature_3"),
      ],
      duration: t("painting_services_duration"),
    },
    {
      id: "commercial-renovation",
      icon: IconBuildingStore,
      title: t("commercial_renovation_title"),
      description: t("commercial_renovation_description"),
      features: [
        t("commercial_renovation_feature_1"),
        t("commercial_renovation_feature_2"),
        t("commercial_renovation_feature_3"),
      ],
      duration: t("commercial_renovation_duration"),
    },
    {
      id: "general-contracting",
      icon: IconHammer,
      title: t("general_contracting_title"),
      description: t("general_contracting_description"),
      features: [
        t("general_contracting_feature_1"),
        t("general_contracting_feature_2"),
        t("general_contracting_feature_3"),
      ],
      duration: t("general_contracting_duration"),
    },
  ];

  const emergencyServices = [
    {
      icon: IconEmergencyBed,
      title: t("emergency_repairs"),
      description: t("emergency_repairs_description"),
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
      title: t("site_visits"),
      description: t("site_visits_description"),
      contact: t("site_visits_contact"),
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Container size="lg" py="xl">
        {/* Header */}
        <Paper p="xl" mb="xl" withBorder>
          <Stack align="center" gap="md">
            <ThemeIcon size={60} variant="light">
              <IconHammer size={30} />
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
                        {t("book_consultation")}
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
                    <IconHammer size={20} />
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
                    <IconHomeEco size={20} />
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
                  {t("book_consultation")}
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
