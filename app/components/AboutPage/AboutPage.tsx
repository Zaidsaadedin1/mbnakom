import React from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Card,
  Image,
  List,
  Grid,
  Box,
  SimpleGrid,
  ThemeIcon,
  BackgroundImage,
  Overlay,
  Paper,
  rem,
  Timeline,
} from "@mantine/core";
import {
  IconBuilding,
  IconHammer,
  IconTools,
  IconTruck,
  IconCertificate,
  IconAward,
  IconShield,
  IconCheck,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";

const AboutPage = () => {
  const { t } = useTranslation("about");

  return (
    <Box>
      {/* Hero Banner */}
      <BackgroundImage src="/images/about_image.jpg" radius={0} h={500}>
        <Overlay color="#000" opacity={0.4} zIndex={1} />
        <Container size="lg" h="100%">
          <Stack
            justify="center"
            h="100%"
            gap="xl"
            style={{ position: "relative", zIndex: 2 }}
          >
            <Badge variant="filled" color="orange" size="xl">
              {t("hero.badge")}
            </Badge>
            <Title order={1} size={rem(48)} c="white">
              {t("hero.title")}
            </Title>
            <Text size="xl" c="white" maw={600}>
              {t("hero.description")}
            </Text>
            <Group>
              {[
                { icon: IconHammer, label: t("hero.badges.residential") },
                { icon: IconTools, label: t("hero.badges.commercial") },
                { icon: IconTruck, label: t("hero.badges.infrastructure") },
                { icon: IconShield, label: t("hero.badges.licensed") },
              ].map((item, index) => (
                <Badge
                  key={index}
                  variant="light"
                  color="orange"
                  size="lg"
                  leftSection={<item.icon size={30} />}
                >
                  <Text color="white">{item.label}</Text>
                </Badge>
              ))}
            </Group>
          </Stack>
        </Container>
      </BackgroundImage>

      {/* Main Content */}
      <Container size="lg" py={rem(80)}>
        {/* About Company */}
        <Grid gutter="xl" mb={rem(80)}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="/images/about_image2.jpg"
              alt={t("about.imageAlt")}
              radius="md"
              height={400}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack>
              <Title order={2} mb="md">
                {t("about.title")}
              </Title>
              <Text size="lg" c="dimmed" mb="xl">
                {t("about.description")}
              </Text>
              <List
                spacing="sm"
                size="lg"
                icon={
                  <ThemeIcon color="orange" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                {[
                  t("about.point1"),
                  t("about.point2"),
                  t("about.point3"),
                  t("about.point4"),
                ].map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Stats Section */}
        <Paper withBorder p="xl" radius="md" mb={rem(80)}>
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            {[
              { value: "150+", label: t("stats.projects") },
              { value: "12+", label: t("stats.years") },
              { value: "80+", label: t("stats.clients") },
              { value: "20+", label: t("stats.materials") },
            ].map((stat, index) => (
              <Box key={index} ta="center">
                <Text size={rem(48)} fw={700} color="orange">
                  {stat.value}
                </Text>
                <Text size="lg" c="dimmed">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Paper>

        {/* Services */}
        <Box mb={rem(80)}>
          <Title order={2} ta="center" mb="xl">
            {t("services.title")}
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="md">
            {[
              {
                icon: IconBuilding,
                title: t("services.residential.title"),
                description: t("services.residential.description"),
              },
              {
                icon: IconTools,
                title: t("services.commercial.title"),
                description: t("services.commercial.description"),
              },
              {
                icon: IconTruck,
                title: t("services.infrastructure.title"),
                description: t("services.infrastructure.description"),
              },
              {
                icon: IconCertificate,
                title: t("services.restoration.title"),
                description: t("services.restoration.description"),
              },
            ].map((service, index) => (
              <Card
                key={index}
                shadow="sm"
                p="xl"
                radius="md"
                withBorder
                h="100%"
              >
                <ThemeIcon size={60} radius="md" color="orange" mb="md">
                  <service.icon size={30} />
                </ThemeIcon>
                <Title order={4} mb="sm">
                  {service.title}
                </Title>
                <Text c="dimmed">{service.description}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Timeline */}
        <Box mb={rem(80)}>
          <Title order={2} ta="center" mb="xl">
            {t("history.title")}
          </Title>
          <Timeline active={3} bulletSize={30} lineWidth={4}>
            {[
              {
                year: t("history.founded.year"),
                title: t("history.founded.title"),
                description: t("history.founded.description"),
              },
              {
                year: t("history.expansion.year"),
                title: t("history.expansion.title"),
                description: t("history.expansion.description"),
              },
              {
                year: t("history.innovation.year"),
                title: t("history.innovation.title"),
                description: t("history.innovation.description"),
              },
            ].map((item, index) => (
              <Timeline.Item
                key={index}
                bullet={
                  <ThemeIcon size={30} radius="xl" color="orange">
                    <IconAward size={16} />
                  </ThemeIcon>
                }
                title={
                  <Group>
                    <Text fw={600}>{item.year}</Text>
                    <Text fw={600}>{item.title}</Text>
                  </Group>
                }
              >
                <Text c="dimmed">{item.description}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Box>

        {/* Safety & Quality */}
        <Card shadow="md" radius="md" withBorder p={0}>
          <Grid gutter={0}>
            <Grid.Col span={{ base: 12, md: 6 }} p="xl">
              <Stack>
                <Title order={3} mb="md">
                  {t("safety.title")}
                </Title>
                <List spacing="sm" icon={<IconCheck color="green" />}>
                  {[
                    t("safety.item1"),
                    t("safety.item2"),
                    t("safety.item3"),
                  ].map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} p="xl" bg="dark.1">
              <Stack>
                <Title order={3} mb="md">
                  {t("quality.title")}
                </Title>
                <List spacing="sm" icon={<IconCheck color="green" />}>
                  {[
                    t("quality.item1"),
                    t("quality.item2"),
                    t("quality.item3"),
                  ].map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutPage;
