import React from "react";
import {
  Title,
  TextInput,
  Button,
  Text,
  PasswordInput,
  Box,
  Grid,
  Checkbox,
  Divider,
  Anchor,
  Center,
  Stack,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUser, IconPhone, IconCheck, IconX } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { keyframes } from "@emotion/react";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserDto } from "../../Apis/types/authDtos/authDtos";
import authController from "../../Apis/controllers/authController";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const SignUp = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("signUp");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";

  const schema = z
    .object({
      username: z
        .string()
        .min(3, { message: t("validation.username_min") })
        .max(20, { message: t("validation.username_max") })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: t("validation.username_regex"),
        }),
      email: z
        .string()
        .min(1, { message: t("validation.email_required") })
        .email({ message: t("validation.email_invalid") }),
      password: z
        .string()
        .min(1, { message: t("validation.password_required") })
        .min(8, { message: t("validation.password_min") })
        .regex(/[A-Z]/, {
          message: t("validation.password_uppercase"),
        })
        .regex(/[0-9]/, { message: t("validation.password_number") }),
      confirmPassword: z
        .string()
        .min(1, { message: t("validation.confirm_password_required") }),
      firstName: z
        .string()
        .min(1, { message: t("validation.first_name_required") }),
      lastName: z
        .string()
        .min(1, { message: t("validation.last_name_required") }),
      phoneNumber: z
        .string()
        .nonempty({ message: t("validation.phone_required") })
        .regex(/^\+?[\d\s\-()]{10,20}$/, {
          message: t("validation.phone_invalid"),
        })
        .refine(
          (val) =>
            val.replace(/\D/g, "").length >= 10 &&
            val.replace(/\D/g, "").length <= 15,
          {
            message: t("validation.phone_invalid"),
          }
        ),
      gender: z.string().min(1, { message: t("validation.gender_required") }),
      dateOfBirth: z
        .date({
          required_error: t("validation.birth_date_required"),
          invalid_type_error: t("validation.birth_date_required"),
        })
        .refine(
          (date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
              return age - 1 >= 13;
            }
            return age >= 13;
          },
          { message: t("validation.age_minimum") }
        ),

      termsAccepted: z.boolean().refine((value) => value === true, {
        message: t("validation.terms_required"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwords_match"),
      path: ["confirmPassword"],
    });

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: null as Date | null,
      gender: "male",
      termsAccepted: false,
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

  // Show notifications
  const showSuccessNotification = () => {
    notifications.show({
      id: "register-success",
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
      id: "register-error",
      title: t("notifications.error_title"),
      message: errorMessage,
      color: "red",
      icon: <IconX size={16} />,
      autoClose: 3000,
      withCloseButton: true,
      withBorder: true,
    });
  };

  type ErrorWithResponse = {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  const registerMutation = useMutation({
    mutationFn: authController.register,
    onSuccess: () => {
      showSuccessNotification();
      setTimeout(() => {
        router.push(`/${currentLang}/login`);
      }, 1500);
    },
    onError: (error: unknown) => {
      let errorMessage = t("notifications.error_generic");

      function hasResponse(obj: unknown): obj is ErrorWithResponse {
        return (
          typeof obj === "object" &&
          obj !== null &&
          "response" in obj &&
          typeof (obj as { response?: unknown }).response === "object"
        );
      }

      if (hasResponse(error) && error.response?.data) {
        const responseData = error.response.data;
        if (
          responseData.message?.includes("Email or Phone is already taken.")
        ) {
          errorMessage = t("notifications.error_user_exists");
          form.setErrors({ email: errorMessage });
        } else if (
          responseData.message?.includes(
            "Invalid registration details. Something is missing."
          )
        ) {
          errorMessage = t(
            "notifications.error_user_exists_invalid_registration_details_Something_is_missing"
          );
          form.setErrors({ username: errorMessage });
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
      }

      showErrorNotification(errorMessage);
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log("Form values:", values);
    try {
      const registerUserDto: RegisterUserDto = {
        userName: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth as Date,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        termsAccepted: values.termsAccepted,
      };
      registerMutation.mutate(registerUserDto);
    } catch {
      showErrorNotification("notifications.error_generic");
    }
  });

  return (
    <>
      {registerMutation.isPending && <LoadingOverlay visible />}
      <Stack dir={isRTL ? "rtl" : "ltr"} p="md">
        {/* Main Form Content */}
        <Box component="div" style={{ animation: `${fadeIn} 0.8s ease-out` }}>
          <Title
            order={2}
            mb="md"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("title")}
          </Title>
        </Box>

        <Box component="div" style={{ animation: `${fadeIn} 1s ease-out` }}>
          <Text size="sm" color="dimmed" mb="xl">
            {t("subtitle")}
          </Text>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          style={{ animation: `${fadeIn} 1.2s ease-out` }}
        >
          <Divider
            label={t("sections.account")}
            labelPosition="center"
            mb="md"
          />

          <TextInput
            label={t("fields.username")}
            placeholder={t("placeholders.username")}
            leftSection={<IconUser size={16} />}
            mb="md"
            error={form.errors.username}
            {...form.getInputProps("username")}
          />

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label={t("fields.firstName")}
                placeholder={t("placeholders.firstName")}
                error={form.errors.firstName}
                {...form.getInputProps("firstName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label={t("fields.lastName")}
                placeholder={t("placeholders.lastName")}
                error={form.errors.lastName}
                {...form.getInputProps("lastName")}
              />
            </Grid.Col>
          </Grid>

          <Grid gutter="md" align="flex-start" mt="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label={t("fields.email")}
                placeholder={t("placeholders.email")}
                mt="md"
                error={form.errors.email}
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label={t("fields.phoneNumber")}
                placeholder={t("placeholders.phoneNumber")}
                mt="md"
                leftSection={<IconPhone size={16} />}
                error={form.errors.phoneNumber}
                {...form.getInputProps("phoneNumber")}
              />
            </Grid.Col>
          </Grid>

          <Grid gutter="md" mt="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <PasswordInput
                label={t("fields.password")}
                placeholder={t("placeholders.password")}
                error={form.errors.password}
                {...form.getInputProps("password")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <PasswordInput
                label={t("fields.confirmPassword")}
                placeholder={t("placeholders.confirmPassword")}
                error={form.errors.confirmPassword}
                {...form.getInputProps("confirmPassword")}
              />
            </Grid.Col>
          </Grid>

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <DatePickerInput
                label={t("fields.birthDate")}
                placeholder={t("placeholders.birthDate")}
                value={form.values.dateOfBirth}
                onChange={(date) =>
                  form.setFieldValue("dateOfBirth", date ?? new Date())
                }
                error={form.errors.birthDate}
                popoverProps={{ withinPortal: true }}
                nextIcon={<IconChevronRight size={16} />}
                previousIcon={<IconChevronLeft size={16} />}
              />
            </Grid.Col>
          </Grid>

          <Select
            dir={isRTL ? "rtl" : "ltr"}
            p="md"
            label={t("genders.fields.gender")}
            placeholder={t("genders.placeholders.gender")}
            data={[
              { value: "male", label: t("genders.male") },
              { value: "female", label: t("genders.female") },
              { value: "nonbinary", label: t("genders.nonbinary") },
              { value: "transgender", label: t("genders.transgender") },
              { value: "genderqueer", label: t("genders.genderqueer") },
              { value: "agender", label: t("genders.agender") },
              { value: "other", label: t("genders.other") },
              {
                value: "prefer_not_to_say",
                label: t("genders.prefer_not_to_say"),
              },
            ]}
            value={form.values.gender}
            onChange={(value) => form.setFieldValue("gender", value || "")}
            error={form.errors.gender}
            mb="md"
          />

          <Checkbox
            mt="xl"
            label={
              <>
                {t("terms.agree")}{" "}
                <Anchor
                  href={`/${currentLang}/termsOfService`}
                  target="_blank"
                  size="sm"
                >
                  {t("terms.termsOfService")}
                </Anchor>{" "}
                <Anchor
                  href={`/${currentLang}/privacyPolicy`}
                  target="_blank"
                  size="sm"
                >
                  {t("terms.privacyPolicy")}
                </Anchor>
              </>
            }
            error={form.errors.termsAccepted}
            {...form.getInputProps("termsAccepted", { type: "checkbox" })}
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            mt="xl"
            loading={registerMutation.isPending}
          >
            {t("buttons.create")}
          </Button>
        </Box>

        <Center mt="lg">
          <Anchor
            size="sm"
            href="/login"
            onClick={() => router.push(`/${currentLang}/login`)}
          >
            {t("login.existingAccount")}
          </Anchor>
        </Center>
      </Stack>
    </>
  );
};

export default SignUp;
