import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "brand",
  primaryShade: 6,
  fontFamily: "var(--open-sans-font), sans-serif",
  headings: {
    fontFamily: "'Playfair Display', serif",
  },
  components: {
    Menu: {
      styles: (theme: {
        colors: { [x: string]: any[]; gray: any[] };
        primaryColor: string | number;
        black: any;
        fontSizes: { sm: any };
      }) => ({
        item: {
          fontFamily: "Oswald, sans-serif",
          color: theme.colors[theme.primaryColor]?.[7] ?? "#50becc",
          fontSize: theme.fontSizes.sm,
          "&:hover": {
            backgroundColor:
              theme.colors[theme.primaryColor]?.[0] ?? theme.colors.gray[0],
          },
        },
      }),
    },
  },
  colors: {
    brand: [
      "#f4faff",
      "#e0f2fe",
      "#c7e0fa",
      "#a8ccf1",
      "#87b8eb",
      "#5da3e4",
      "#e7b86a", // index 6 - main shade
      "#2a73c3",
      "#205a9e",
      "#1a4577",
    ] as const,
    teal: [
      "#f0fdfa",
      "#ccfbf1",
      "#99f6e4",
      "#5eead4",
      "#2dd4bf",
      "#14b8a6",
      "#0d9488",
      "#0f766e",
      "#115e59",
      "#134e4a",
    ] as const,
    navy: [
      "#f5f7fa",
      "#e4e9f2",
      "#c5cee0",
      "#8f9bb3",
      "#2e3a59",
      "#222b45",
      "#192038",
      "#151a30",
      "#101426",
      "#0b1023",
    ] as const,
    green: [
      "#ecfdf5",
      "#d1fae5",
      "#a7f3d0",
      "#6ee7b7",
      "#34d399",
      "#10b981",
      "#059669",
      "#047857",
      "#065f46",
      "#064e3b",
    ] as const,
    purple: [
      "#faf5ff",
      "#f3e8ff",
      "#e9d5ff",
      "#d8b4fe",
      "#c084fc",
      "#a855f7",
      "#9333ea",
      "#7e22ce",
      "#6b21a8",
      "#581c87",
    ] as const,
    red: [
      "#fef2f2",
      "#fee2e2",
      "#fecaca",
      "#fca5a5",
      "#f87171",
      "#ef4444",
      "#dc2626",
      "#b91c1c",
      "#991b1b",
      "#7f1d1d",
    ] as const,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  defaultGradient: {
    from: "brand.4",
    to: "teal.5",
    deg: 60,
  },
  shadows: {
    xs: "0 1px 2px rgba(16, 24, 40, 0.05)",
    sm: "0 1px 3px rgba(16, 24, 40, 0.1)",
    md: "0 4px 8px rgba(16, 24, 40, 0.15)",
    lg: "0 8px 24px rgba(16, 24, 40, 0.2)",
    xl: "0 12px 48px rgba(16, 24, 40, 0.25)",
  },
};
