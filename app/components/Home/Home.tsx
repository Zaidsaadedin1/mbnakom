import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Card,
  Grid,
  Badge,
  Button,
  Paper,
  Box,
  ThemeIcon,
  Image,
  List,
  Timeline,
  Accordion,
  SimpleGrid,
  Modal,
} from "@mantine/core";
import {
  IconBuilding,
  IconHammer,
  IconTools,
  IconTruck,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconChevronRight,
  IconChevronLeft,
  IconCalendar,
  IconMail,
  IconClock,
  IconUserCheck,
  IconCertificate,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ContactForm from "../../blocks/ContactForm/ContactForm";
import CallNowButton from "../../blocks/CallNowButton/CallNowButton";

const homePageVideo = "/videos/video1.mp4";

export const HomePage = () => {
  const { t, i18n } = useTranslation("home");
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRTL = i18n.language === "ar";
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const currentLang = i18n.language;

  // Statistics counter animation
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    materials: 0,
    years: 0,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = true;
      video.controls = false;
      video.muted = true;

      const handlePlay = () => {
        video.play().catch((e) => {
          console.error("Play error:", e);
          document.addEventListener(
            "click",
            () => {
              video.play().catch(console.error);
            },
            { once: true }
          );
        });
      };

      video.addEventListener("canplay", handlePlay);
      return () => {
        video.removeEventListener("canplay", handlePlay);
      };
    }
  }, []);

  useEffect(() => {
    const targetStats = {
      projects: 150,
      clients: 80,
      materials: 20,
      years: 12,
    };

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        projects: Math.floor(targetStats.projects * progress),
        clients: Math.floor(targetStats.clients * progress),
        materials: Math.floor(targetStats.materials * progress),
        years: Math.floor(targetStats.years * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const getChevronIcon = () => {
    return isRTL ? (
      <IconChevronLeft size={16} />
    ) : (
      <IconChevronRight size={16} />
    );
  };

  const getArrowIcon = () => {
    return isRTL ? <IconArrowLeft size={20} /> : <IconArrowRight size={20} />;
  };

  const services = [
    {
      icon: IconBuilding,
      title: t("service_1_title"),
      description: t("service_1_description"),
      duration: t("service_1_duration"),
    },
    {
      icon: IconHammer,
      title: t("service_2_title"),
      description: t("service_2_description"),
      duration: t("service_2_duration"),
    },
    {
      icon: IconTools,
      title: t("service_3_title"),
      description: t("service_3_description"),
      duration: t("service_3_duration"),
    },
    {
      icon: IconTruck,
      title: t("service_4_title"),
      description: t("service_4_description"),
      duration: t("service_4_duration"),
    },
    {
      icon: IconCertificate,
      title: t("service_5_title"),
      description: t("service_5_description"),
      duration: t("service_5_duration"),
    },
    {
      icon: IconBuilding,
      title: t("service_6_title"),
      description: t("service_6_description"),
      duration: t("service_6_duration"),
    },
  ];

  const blogPosts = [
    {
      title: t("blog_1_title"),
      excerpt: t("blog_1_excerpt"),
      date: t("blog_1_date"),
      readTime: t("blog_1_read_time"),
      image: "images/blog1.jpg",
      category: t("blog_1_category"),
      onClick: () =>
        router.push(
          `https://stpmasonry.com/innovative-masonry-techniques-and-trends-in-2024/`
        ),
    },
    {
      title: t("blog_2_title"),
      excerpt: t("blog_2_excerpt"),
      date: t("blog_2_date"),
      readTime: t("blog_2_read_time"),
      image: "images/blog2.jpg",
      category: t("blog_2_category"),
      onClick: () =>
        router.push(
          `https://mcclurevision.com/how-to-select-building-materials-for-your-project/`
        ),
    },
    {
      title: t("blog_3_title"),
      excerpt: t("blog_3_excerpt"),
      date: t("blog_3_date"),
      readTime: t("blog_3_read_time"),
      image: "images/blog3.jpg",
      category: t("blog_3_category"),
      onClick: () =>
        router.push(
          `https://eptura.com/discover-more/blog/infrastructure-maintenance/`
        ),
    },
  ];

  const faqs = [
    {
      question: t("faq_1_question"),
      answer: t("faq_1_answer"),
    },
    {
      question: t("faq_2_question"),
      answer: t("faq_2_answer"),
    },
    {
      question: t("faq_3_question"),
      answer: t("faq_3_answer"),
    },
    {
      question: t("faq_4_question"),
      answer: t("faq_4_answer"),
    },
    {
      question: t("faq_5_question"),
      answer: t("faq_5_answer"),
    },
  ];

  const processSteps = [
    {
      icon: IconCalendar,
      title: t("process_1_title"),
      description: t("process_1_desc"),
    },
    {
      icon: IconUserCheck,
      title: t("process_2_title"),
      description: t("process_2_desc"),
    },
    {
      icon: IconHammer,
      title: t("process_3_title"),
      description: t("process_3_desc"),
    },
    {
      icon: IconBuilding,
      title: t("process_4_title"),
      description: t("process_4_desc"),
    },
  ];

  return (
    <Box dir={isRTL ? "rtl" : "ltr"}>
      <Box
        style={{
          position: "relative",
          minHeight: "80vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={homePageVideo} type="video/mp4" />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Text size="xl" color="white">
              {t("video_not_supported")}
            </Text>
          </div>
        </video>

        <Stack
          style={{
            position: "relative",
            zIndex: 2,
          }}
          dir={isRTL ? "rtl" : "ltr"}
          justify="center"
          mt={"20%"}
          p={"xl"}
        >
          <Group mb="xl">
            <ThemeIcon size={80} radius="xl" variant="white">
              <IconBuilding size={40} />
            </ThemeIcon>
          </Group>

          <Title
            dir={isRTL ? "rtl" : "ltr"}
            order={1}
            size={60}
            fw={900}
            c="white"
            mb="md"
          >
            {t("hero_title")}
          </Title>

          <Text
            dir={isRTL ? "rtl" : "ltr"}
            size="xl"
            c="white"
            mb="xl"
            maw={600}
          >
            {t("hero_subtitle")}
          </Text>

          <Group gap="lg" mb={60} dir={isRTL ? "rtl" : "ltr"}>
            <Button
              size="xl"
              variant="white"
              leftSection={<IconCalendar size={24} />}
              onClick={() => router.push(`/${currentLang}/appointments`)}
            >
              {t("request_quote")}
            </Button>
          </Group>
        </Stack>
      </Box>

      {/* Stats Section */}
      <Container size="xl" py={80} dir={isRTL ? "rtl" : "ltr"}>
        <Paper p={60} radius="xl" mb={80}>
          <Title order={2} ta="center" mb={50}>
            {t("stats_title")}
          </Title>
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
            <Box ta="center">
              <Title order={1} size={50} fw={900} mb="xs">
                {stats.projects.toLocaleString()}+
              </Title>
              <Text size="lg" c="dimmed">
                {t("stats_projects")}
              </Text>
            </Box>
            <Box ta="center">
              <Title order={1} size={50} fw={900} mb="xs">
                {stats.clients.toLocaleString()}+
              </Title>
              <Text size="lg" c="dimmed">
                {t("stats_clients")}
              </Text>
            </Box>
            <Box ta="center">
              <Title order={1} size={50} fw={900} mb="xs">
                {stats.materials}
              </Title>
              <Text size="lg" c="dimmed">
                {t("stats_materials")}
              </Text>
            </Box>
            <Box ta="center">
              <Title order={1} size={50} fw={900} mb="xs">
                {stats.years}+
              </Title>
              <Text size="lg" c="dimmed">
                {t("stats_experience")}
              </Text>
            </Box>
          </SimpleGrid>
        </Paper>

        {/* About Section */}
        <Grid mb={80} align="center">
          <Grid.Col
            span={{ base: 12, md: 6 }}
            order={{ base: 1, md: isRTL ? 2 : 1 }}
          >
            <Image
              src="/images/about_image.jpg"
              alt="about image"
              onClick={() => router.push(`/${currentLang}/about`)}
              style={{ cursor: "pointer" }}
            />
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 6 }}
            order={{ base: 2, md: isRTL ? 1 : 2 }}
          >
            <Badge size="lg" variant="light" mb="md">
              {t("about_badge")}
            </Badge>
            <Title order={2} size={40} mb="lg">
              {t("about_title")}
            </Title>
            <Text size="lg" mb="xl" c="dimmed" style={{ lineHeight: 1.8 }}>
              {t("about_description")}
            </Text>
            <List spacing="md" size="lg" icon={<IconCheck size={20} />} mb="xl">
              <List.Item>{t("about_point_1")}</List.Item>
              <List.Item>{t("about_point_2")}</List.Item>
              <List.Item>{t("about_point_3")}</List.Item>
              <List.Item>{t("about_point_4")}</List.Item>
            </List>
            <Button
              size="lg"
              variant="outline"
              rightSection={getArrowIcon()}
              onClick={() => router.push(`/${currentLang}/about`)}
            >
              {t("learn_more")}
            </Button>
          </Grid.Col>
        </Grid>

        {/* Services Section */}
        <Box mb={80}>
          <Box ta="center" mb={60}>
            <Badge size="xl" variant="light" mb="md">
              {t("services_badge")}
            </Badge>
            <Title order={2} size={40} mb="lg">
              {t("services_title")}
            </Title>
            <Text size="xl" c="dimmed" maw={700} mx="auto">
              {t("services_subtitle")}
            </Text>
          </Box>

          <Grid>
            {services.map((service, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                <Card
                  shadow="sm"
                  radius="md"
                  p="xl"
                  h="100%"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/${currentLang}/services`)}
                >
                  <Group
                    justify="space-between"
                    mb="md"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <ThemeIcon size={60} radius="xl" variant="light">
                      <service.icon size={30} />
                    </ThemeIcon>
                  </Group>

                  <Title order={3} size="h3" mb="sm">
                    {service.title}
                  </Title>

                  <Text c="dimmed" mb="md" style={{ lineHeight: 1.6 }}>
                    {service.description}
                  </Text>

                  <Group
                    justify="space-between"
                    align="center"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <Text size="sm" c="dimmed">
                      <IconClock
                        size={16}
                        style={{
                          marginRight: isRTL ? 0 : "5px",
                          marginLeft: isRTL ? "5px" : 0,
                        }}
                      />
                      {service.duration}
                    </Text>
                    <Button
                      variant="subtle"
                      size="sm"
                      rightSection={getChevronIcon()}
                    >
                      {t("learn_more")}
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>

        {/* Process Section */}
        <Paper p={60} radius="md" mb={80}>
          <Box ta="center" mb={60}>
            <Badge size="xl" variant="light" mb="md">
              {t("process_badge")}
            </Badge>
            <Title order={2} size={40} mb="lg">
              {t("process_title")}
            </Title>
            <Text size="xl" c="dimmed" maw={700} mx="auto">
              {t("process_subtitle")}
            </Text>
          </Box>

          <Timeline active={3} bulletSize={60} lineWidth={4}>
            {processSteps.map((step, index) => (
              <Timeline.Item
                key={index}
                bullet={
                  <ThemeIcon size={60} radius="xl" variant="filled">
                    <step.icon size={24} />
                  </ThemeIcon>
                }
                title={
                  <Title order={3} size="h3" mb="sm">
                    {step.title}
                  </Title>
                }
              >
                <Text size="lg" c="dimmed" mb="xl">
                  {step.description}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Paper>

        {/* Blog Section */}
        <Box mb={80}>
          <Box ta="center" mb={60}>
            <Badge size="xl" variant="light" mb="md">
              {t("blog_badge")}
            </Badge>
            <Title order={2} size={40} mb="lg">
              {t("blog_title")}
            </Title>
            <Text size="xl" c="dimmed" maw={700} mx="auto">
              {t("blog_subtitle")}
            </Text>
          </Box>

          <Grid>
            {blogPosts.map((post, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <Card
                  shadow="sm"
                  radius="md"
                  p={0}
                  h="100%"
                  onClick={post.onClick}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={post.image}
                    height={200}
                    alt={post.title}
                    radius="md md 0 0"
                  />
                  <Box p="xl">
                    <Group
                      justify="space-between"
                      mb="md"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <Badge variant="light">{post.category}</Badge>
                      <Text size="sm" c="dimmed">
                        {post.date}
                      </Text>
                    </Group>
                    <Title order={4} mb="md" lineClamp={2}>
                      {post.title}
                    </Title>
                    <Text c="dimmed" mb="lg" lineClamp={3}>
                      {post.excerpt}
                    </Text>
                    <Group
                      justify="space-between"
                      align="center"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <Text size="sm" c="dimmed">
                        <IconClock
                          size={16}
                          style={{
                            marginRight: isRTL ? 0 : "5px",
                            marginLeft: isRTL ? "5px" : 0,
                          }}
                        />
                        {post.readTime}
                      </Text>
                      <Button variant="subtle" rightSection={getArrowIcon()}>
                        {t("read_more")}
                      </Button>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box mb={80}>
          <Box ta="center" mb={60}>
            <Badge size="xl" variant="light" mb="md">
              {t("faq_badge")}
            </Badge>
            <Title order={2} size={40} mb="lg">
              {t("faq_title")}
            </Title>
            <Text size="xl" c="dimmed" maw={700} mx="auto">
              {t("faq_subtitle")}
            </Text>
          </Box>

          <Accordion variant="separated" radius="md" defaultValue="0">
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} value={index.toString()}>
                <Accordion.Control>{faq.question}</Accordion.Control>
                <Accordion.Panel>
                  <Text c="dimmed">{faq.answer}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>

        {/* Newsletter Section */}
        <Paper p={60} radius="md" mb={80}>
          <ThemeIcon size={80} radius="xl" variant="light" mb="xl" mx="auto">
            <IconMail size={40} />
          </ThemeIcon>
          <Title order={2} size={40} mb="lg" ta="center">
            {t("newsletter_title")}
          </Title>
          <Text size="xl" mb="xl" maw={600} mx="auto" c="dimmed">
            {t("newsletter_subtitle")}
          </Text>

          <Button
            size="lg"
            variant="outline"
            radius="md"
            onClick={() => router.push(`/${currentLang}/subscribe`)}
            mx="auto"
            display="block"
          >
            {t("subscribe")}
          </Button>
        </Paper>

        {/* Contact Section */}
        <ContactForm />
      </Container>

      {/* Final CTA Section */}
      <Box py={80}>
        <Container size="md">
          <ThemeIcon size={100} radius="xl" variant="light" mb="xl" mx="auto">
            <IconBuilding size={50} />
          </ThemeIcon>
          <Title order={1} size={50} fw={900} mb="lg" ta="center">
            {t("final_cta_title")}
          </Title>
          <Text size="xl" mb="xl" maw={600} mx="auto" c="dimmed" ta="center">
            {t("final_cta_subtitle")}
          </Text>
          <Group justify="center" gap="lg" dir={isRTL ? "rtl" : "ltr"}>
            <Button
              size="xl"
              variant="filled"
              leftSection={<IconCalendar size={24} />}
              onClick={() => router.push(`/${currentLang}/contact`)}
            >
              {t("get_quote")}
            </Button>
            <CallNowButton />
          </Group>
        </Container>
      </Box>

      {/* Success Modal */}
      <Modal
        opened={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("success_modal_title")}
        centered
        radius="md"
      >
        <Stack align="center" gap="md">
          <ThemeIcon size={60} radius="xl" color="green">
            <IconCheck size={30} />
          </ThemeIcon>
          <Text ta="center" size="lg">
            {t("success_modal_message")}
          </Text>
          <Button onClick={() => setShowSuccessModal(false)} variant="light">
            {t("success_modal_button")}
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
};
