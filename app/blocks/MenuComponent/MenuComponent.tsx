import React from "react";
import {
  AppShell,
  Group,
  Button,
  Image,
  Burger,
  Drawer,
  Stack,
  Divider,
  useMantineTheme,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconHammer,
  IconBuilding,
  IconInfoCircle,
  IconPhoneCall,
  IconUser,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useAuth } from "../../contexts/AuthContext";

const MenuComponent = () => {
  const { t, i18n } = useTranslation("menuComponent");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");

  const menuItems = [
    { path: "/services", icon: IconHammer, label: t("our_services") },
    { path: "/projects", icon: IconBuilding, label: t("our_projects") },
    { path: "/contact", icon: IconPhoneCall, label: t("get_quote") },
    { path: "/about", icon: IconInfoCircle, label: t("about_us") },
  ];

  const authItems = [
    { path: "/profile", icon: IconUser, label: t("profile") },
    { path: "/login", icon: IconLogin, label: t("login"), action: null },
    { path: null, icon: IconLogout, label: t("logout"), action: logout },
  ];

  return (
    <AppShell header={{ height: 80 }} padding="md" mb={"xl"}>
      <AppShell.Header
        style={{
          backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
          borderBottom: `1px solid ${
            isDark ? theme.colors.dark[6] : theme.colors.gray[2]
          }`,
        }}
      >
        <Group
          justify="space-between"
          align="center"
          style={{ height: "100%", padding: "0 16px" }}
          wrap="nowrap"
        >
          {/* Logo - Always visible */}
          <Image
            src={
              isDark
                ? "/images/construction-logo-white.png"
                : "/images/construction-logo-dark.png"
            }
            alt="Logo"
            width={140}
            onClick={() => router.push(`/${currentLang}/`)}
            style={{ cursor: "pointer" }}
          />

          {/* Desktop Navigation - Hidden on mobile */}
          {!isMobile && (
            <Group gap="xl" style={{ flexGrow: 1, justifyContent: "center" }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="subtle"
                  color={isDark ? "gray.2" : "dark"}
                  leftSection={<item.icon size={20} />}
                  onClick={() => router.push(`/${currentLang}${item.path}`)}
                  style={{ fontWeight: 600 }}
                >
                  {item.label}
                </Button>
              ))}
            </Group>
          )}

          {/* Right side actions - Hidden on mobile */}
          {!isMobile && (
            <Group gap="sm">
              {isAuthenticated ? (
                <Menu position="bottom-end">
                  <Menu.Target>
                    <Button
                      variant={isDark ? "white" : "filled"}
                      color="orange"
                      leftSection={<IconUser size={20} />}
                      radius="xl"
                      px="xl"
                    >
                      {user?.firstName}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {authItems.map((item) => (
                      <Menu.Item
                        key={item.label}
                        leftSection={<item.icon size={16} />}
                        color={item.label === t("logout") ? "red" : undefined}
                        onClick={
                          item.action ||
                          (() => router.push(`/${currentLang}${item.path}`))
                        }
                      >
                        {item.label}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button
                  variant="filled"
                  color="orange"
                  radius="xl"
                  px="xl"
                  leftSection={<IconLogin size={20} />}
                  onClick={() => router.push(`/${currentLang}/login`)}
                >
                  {t("login")}
                </Button>
              )}
              <LanguageSwitcher />
            </Group>
          )}

          {/* Mobile Burger - Only visible on mobile */}
          {isMobile && (
            <Group>
              <LanguageSwitcher />
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                color={isDark ? theme.white : theme.black}
              />
            </Group>
          )}
        </Group>
      </AppShell.Header>

      {/* Mobile Drawer - Only appears on mobile */}
      {isMobile && (
        <Drawer
          opened={opened}
          onClose={close}
          size={isSmallMobile ? "100%" : "60%"}
          padding="md"
          position={isRTL ? "left" : "right"}
          zIndex={1000000}
          styles={{
            header: { justifyContent: "flex-end" },
            content: {
              backgroundColor: isDark ? theme.colors.dark[8] : theme.white,
            },
          }}
        >
          <Stack gap="xl">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                fullWidth
                size="lg"
                variant="light"
                color={isDark ? "gray" : "dark"}
                leftSection={<item.icon size={24} />}
                onClick={() => {
                  router.push(`/${currentLang}${item.path}`);
                  close();
                }}
                style={{ justifyContent: "flex-start" }}
              >
                {item.label}
              </Button>
            ))}

            <Divider />

            {isAuthenticated ? (
              <Stack gap="xl">
                {authItems.map((item) => (
                  <Button
                    key={item.label}
                    fullWidth
                    size="lg"
                    variant="light"
                    color={
                      item.label === t("logout")
                        ? "red"
                        : isDark
                        ? "gray"
                        : "dark"
                    }
                    leftSection={<item.icon size={24} />}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        router.push(`/${currentLang}${item.path}`);
                      }
                      close();
                    }}
                    style={{ justifyContent: "flex-start" }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            ) : (
              <Button
                fullWidth
                size="lg"
                variant="filled"
                color="orange"
                leftSection={<IconLogin size={24} />}
                onClick={() => {
                  router.push(`/${currentLang}/login`);
                  close();
                }}
              >
                {t("login")}
              </Button>
            )}
          </Stack>
        </Drawer>
      )}
    </AppShell>
  );
};

export default MenuComponent;
