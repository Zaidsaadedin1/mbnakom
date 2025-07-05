import React from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Group,
  Badge,
  Button,
  Stack,
  Divider,
  ThemeIcon,
  Box,
  Paper,
} from "@mantine/core";
import { useTranslation } from "next-i18next";
import { IconHome, IconCalendar, IconRuler } from "@tabler/icons-react";
import { useRouter } from "next/router";

interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: string;
  area: string;
  image: string;
  tags: string[];
}

function OurProjects() {
  const { t, i18n } = useTranslation("ourProjects");
  const router = useRouter();
  const isRTL = i18n.language === "ar";
  const currentLang = i18n.language;

  const getLocalizedTags = (tags: unknown): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string")
      return tags.split(",").map((tag) => tag.trim());
    return [];
  };

  const projects: Project[] = [
    {
      id: "villa-renovation",
      title: t("projects.villa_renovation.title"),
      description: t("projects.villa_renovation.description"),
      type: t("project_types.residential"),
      duration: t("projects.villa_renovation.duration"),
      area: "450 m²",
      image: "/images/villa.jpg",
      tags: getLocalizedTags(
        t("projects.villa_renovation.tags", { returnObjects: true })
      ),
    },
    {
      id: "kitchen-makeover",
      title: t("projects.kitchen_makeover.title"),
      description: t("projects.kitchen_makeover.description"),
      type: t("project_types.residential"),
      duration: t("projects.kitchen_makeover.duration"),
      area: "35 m²",
      image: "/images/kitchen.jpg",
      tags: getLocalizedTags(
        t("projects.kitchen_makeover.tags", { returnObjects: true })
      ),
    },
    {
      id: "office-redesign",
      title: t("projects.office_redesign.title"),
      description: t("projects.office_redesign.description"),
      type: t("project_types.commercial"),
      duration: t("projects.office_redesign.duration"),
      area: "200 m²",
      image: "/images/office.jpg",
      tags: getLocalizedTags(
        t("projects.office_redesign.tags", { returnObjects: true })
      ),
    },
    {
      id: "bathroom-transformation",
      title: t("projects.bathroom_transformation.title"),
      description: t("projects.bathroom_transformation.description"),
      type: t("project_types.residential"),
      duration: t("projects.bathroom_transformation.duration"),
      area: "12 m²",
      image: "/images/bathroom.jpg",
      tags: getLocalizedTags(
        t("projects.bathroom_transformation.tags", { returnObjects: true })
      ),
    },
  ];

  return (
    <Container size="lg" py="xl" dir={isRTL ? "rtl" : "ltr"}>
      <Stack gap="xl">
        {/* Header Section */}
        <Box ta="center">
          <ThemeIcon size={60} variant="light" mb="md">
            <IconHome size={30} />
          </ThemeIcon>
          <Title order={1} mb="sm">
            {t("page_title")}
          </Title>
          <Text size="lg" c="dimmed" maw={800} mx="auto">
            {t("page_description")}
          </Text>
        </Box>

        <Divider my="sm" />

        {/* Projects Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {projects.map((project) => (
            <Card key={project.id} shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={project.image}
                  height={220}
                  alt={project.title}
                  style={{ objectFit: "cover" }}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Title order={3}>{project.title}</Title>
                <Badge color="blue" variant="light">
                  {project.type}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="sm">
                {project.description}
              </Text>

              <Group gap="sm" mb="md">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Group gap="xl" mb="sm">
                <Group gap="xs">
                  <IconCalendar size={18} />
                  <Text size="sm">{project.duration}</Text>
                </Group>
                <Group gap="xs">
                  <IconRuler size={18} />
                  <Text size="sm">{project.area}</Text>
                </Group>
              </Group>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => router.push(`/${currentLang}/projects`)}
              >
                {t("view_project")}
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        {/* Call to Action */}
        <Paper p="xl" withBorder ta="center" mt="xl">
          <Title order={3} mb="sm">
            {t("cta.title")}
          </Title>
          <Text size="lg" mb="md" c="dimmed">
            {t("cta.description")}
          </Text>
          <Button
            size="md"
            onClick={() => router.push(`/${currentLang}/appointments`)}
          >
            {t("cta.button")}
          </Button>
        </Paper>
      </Stack>
    </Container>
  );
}

export default OurProjects;
