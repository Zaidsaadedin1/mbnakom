import React from "react";
import {
  Group,
  Text,
  Title,
  Stack,
  Divider,
  ActionIcon,
  List,
  Anchor,
  Box,
  Flex,
  Badge,
  Image,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconPhone,
  IconMapPin,
  IconDental,
  IconFlipFlops,
  IconFaceId,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Footer = () => {
  const { t, i18n } = useTranslation("footer");
  const router = useRouter();
  const isRTL = i18n.language === "ar";

  return (
    <Box mt={50} py="xl" dir={isRTL ? "rtl" : "ltr"}>
      <Divider my="xl" />
      <Flex
        gap="xl"
        justify="space-evenly"
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
      >
        {/* Clinic Info */}
        <Stack gap="md" flex={1} maw={350}>
          <Group gap="sm">
            <IconDental size={38} color="#50becc" />
            <Title order={3} c="dark">
              {t("dr_majdoline_aldeek_clinic")}
            </Title>
          </Group>
          <Text size="md" c="dimmed" fw={500}>
            {t("clinic_title")}
          </Text>
          <Text size="md" c="dimmed">
            {t("clinic_description")}
          </Text>

          {/* Specializations */}
          <Group gap="md">
            <Badge variant="light" leftSection={<IconDental size={12} />}>
              {t("cosmetic_dentistry")}
            </Badge>
            <Badge variant="light" leftSection={<IconFaceId size={12} />}>
              {t("dermal_fillers")}
            </Badge>
            <Badge variant="light" leftSection={<IconFlipFlops size={12} />}>
              {t("dental_botox")}
            </Badge>
          </Group>

          {/* Social Media */}
          <Group gap="md" aria-label={t("follow_us_aria")}>
            <Text size="md" fw={500}>
              {t("follow_us")}
            </Text>
            <Anchor
              href="https://www.instagram.com/dr.majdoline_aldeek?utm_source=ig_web_button_share_sheet&igsh=MWxtYWF5MTI2amhqag=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <ActionIcon size="lg" variant="light" color="pink">
                <IconBrandInstagram size={18} />
              </ActionIcon>
            </Anchor>
            <Anchor
              href="https://www.facebook.com/profile.php?id=61565758469290&ref=_xav_ig_profile_page_web"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <ActionIcon size="lg" variant="light" color="blue">
                <IconBrandFacebook size={18} />
              </ActionIcon>
            </Anchor>
          </Group>
        </Stack>

        {/* Contact Information */}
        <Stack gap="sm" flex={1} maw={300}>
          <Title order={4} c="dark">
            {t("contact_information")}
          </Title>
          <List spacing="md" size="sm" style={{ listStyleType: "none" }}>
            <List.Item>
              <Group gap="md" wrap="nowrap">
                <IconMapPin size={16} />
                <Text size="md">{t("clinic_address")}</Text>
              </Group>
            </List.Item>
            <List.Item>
              <Group gap="md" wrap="nowrap">
                <IconPhone size={16} />
                <Text size="md">{t("clinic_phone")}</Text>
              </Group>
            </List.Item>
            <List.Item>
              <Group gap="smdm" wrap="nowrap">
                <IconMail size={16} />
                <Text size="md">{t("clinic_email")}</Text>
              </Group>
            </List.Item>
          </List>
        </Stack>
      </Flex>

      {/* Footer Bottom */}
      <Divider my="xl" />
      <Text ta="center" size="md" c="dimmed" mb={10}>
        {t("footer_copyright")}
      </Text>
      <Divider my="xl" />
      <Flex
        onClick={() => router.push("https://www.codemastersjo.com/en/")}
        justify="center"
        align="center"
        gap="xs"
        mt="sm"
        style={{ cursor: "pointer" }}
      >
        <Group>
          <Text size="sm" c="dimmed">
            {t("made_with_love_by")}
          </Text>
          <Text size="sm" c="black" fw={500}>
            {t("CodeMastersJo")}
          </Text>
        </Group>
        <Image
          src="/images/logo_black.png"
          alt="Code Masters Logo"
          height={80}
          width={80}
          style={{ borderRadius: 4 }}
        />
      </Flex>
    </Box>
  );
};

export default Footer;
