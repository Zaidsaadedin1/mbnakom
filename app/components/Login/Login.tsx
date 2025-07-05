// Login component
import React from "react";
import {
  Title,
  TextInput,
  Button,
  Text,
  PasswordInput,
  Box,
  Checkbox,
  Anchor,
  Group,
  Divider,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconMail, IconLock, IconX, IconCheck } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { keyframes } from "@emotion/react";
import { useMutation } from "@tanstack/react-query";
import authController from "../../Apis/controllers/authController";
import { useAuth } from "../../contexts/AuthContext";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export default function Login() {
  const router = useRouter();
  const { t, i18n } = useTranslation("login");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const { login } = useAuth();

  const schema = z.object({
    loginIdentifier: z
      .string()
      .min(1, { message: t("validation.identifier_required") })
      .refine(
        (val) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || // email
          /^\+?\d{7,15}$/.test(val) || // phone (simple international)
          /^[a-zA-Z0-9_.-]{3,}$/.test(val), // username (at least 3 chars)
        { message: t("validation.identifier_invalid") }
      ),
    password: z.string().min(1, { message: t("validation.password_required") }),
    rememberMe: z.boolean().optional(),
  });

  const form = useForm({
    initialValues: {
      loginIdentifier: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      try {
        schema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path.length > 0 && typeof err.path[0] === "string") {
              formattedErrors[err.path[0]] = err.message;
            }
          });
          return formattedErrors;
        }
        return {};
      }
    },
    validateInputOnBlur: true,
  });

  const showSuccessNotification = () => {
    notifications.show({
      id: "login-success",
      title: t("notifications.success_title"),
      message: t("notifications.success_message"),
      color: "green",
      icon: <IconCheck size={16} />,
      autoClose: 3000,
      withCloseButton: true,
      withBorder: true,
    });
  };

  const showErrorNotification = (errorMessage: string) => {
    notifications.show({
      id: "login-error",
      title: t("notifications.error_title"),
      message: errorMessage,
      color: "red",
      icon: <IconX size={16} />,
      autoClose: 5000,
      withCloseButton: true,
      withBorder: true,
    });
  };

  const loginMutation = useMutation({
    mutationFn: authController.login,
    onSuccess: (response) => {
      if (response?.data) {
        showSuccessNotification();
        login(response.data as string);
        router.push(`${currentLang}/`);
      }
    },
    onError: (error: unknown) => {
      let errorMessage = t(
        "notifications.error_generic",
        "An error occurred. Please try again."
      );

      // Define a type for the expected error response
      type ErrorResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      const err = error as ErrorResponse;
      if (err?.response?.data) {
        const responseData = err.response.data;
        if (
          typeof responseData === "object" &&
          responseData !== null &&
          "message" in responseData &&
          typeof responseData.message === "string" &&
          responseData.message.includes("Email or Phone is already taken.")
        ) {
          errorMessage = t(
            "notifications.error_user_exists",
            "User already exists."
          );
          form.setErrors({ loginIdentifier: errorMessage });
          form.setErrors({ password: errorMessage });
        } else if (
          typeof responseData === "object" &&
          responseData !== null &&
          "message" in responseData &&
          typeof responseData.message === "string"
        ) {
          errorMessage = responseData.message;
        }
      }

      showErrorNotification(errorMessage);
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <>
      {loginMutation.isPending && <LoadingOverlay visible />}

      <Stack dir={isRTL ? "rtl" : "ltr"}>
        <Title
          order={2}
          mb="md"
          style={{
            animation: `${fadeIn} 0.8s ease-out`,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("title")}
        </Title>

        <Text
          size="sm"
          color="dimmed"
          mb="xl"
          style={{
            animation: `${fadeIn} 1s ease-out`,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("subtitle")}
        </Text>

        <Box
          component="form"
          onSubmit={handleSubmit}
          style={{ animation: `${fadeIn} 1.2s ease-out` }}
        >
          <TextInput
            label={t("fields.email")}
            placeholder={t("fields.email")}
            leftSection={<IconMail size={16} />}
            mb="md"
            error={form.errors.email}
            {...form.getInputProps("loginIdentifier")}
          />

          <PasswordInput
            label={t("fields.password")}
            placeholder={t("fields.password")}
            leftSection={<IconLock size={16} />}
            mb="md"
            error={form.errors.password}
            {...form.getInputProps("password")}
          />

          <Group justify="space-between" mb="md">
            <Checkbox
              label={t("fields.remember_me")}
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />
            <Anchor
              component="a"
              size="sm"
              href={`/${currentLang}/forgotPassword`}
            >
              {t("links.forgot_password")}
            </Anchor>
          </Group>

          <Button
            type="submit"
            fullWidth
            size="md"
            mb="lg"
            loading={loginMutation.isPending}
          >
            {t("buttons.login")}
          </Button>

          <Divider label={t("divider")} labelPosition="center" my="md" />

          <Text size="xs" color="dimmed" ta="center" mt="md">
            {t("links.no_account")}
            <Anchor
              component="a"
              size="xs"
              onClick={() => router.push(`/${currentLang}/signUp`)}
              ml="xs"
            >
              {t("links.signup")}
            </Anchor>
          </Text>
        </Box>
      </Stack>
    </>
  );
}
