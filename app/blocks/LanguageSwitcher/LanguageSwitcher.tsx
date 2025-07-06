import React, { useEffect, useState } from "react";
import { Menu, Button } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, query } = router;
  const { t } = useTranslation("common");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: "en", label: t("common:English") },
    { code: "ar", label: t("common:Arabic") },
  ];

  const changeLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    router.push({ pathname, query }, undefined, { locale: newLocale });
  };

  // Prevent hydration mismatch by deferring rendering until after mount
  if (!mounted) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle" leftSection={<IconLanguage size={16} />}>
          {languages.find((lang) => lang.code === locale)?.label ?? "Language"}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("select_language")}</Menu.Label>
        {languages.map((lang) => (
          <Menu.Item key={lang.code} onClick={() => changeLocale(lang.code)}>
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
