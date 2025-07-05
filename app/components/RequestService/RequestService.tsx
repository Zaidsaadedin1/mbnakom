import React, { useEffect } from "react";
import {
  Container,
  Title,
  TextInput,
  Button,
  Text,
  Grid,
  Textarea,
  Select,
  Checkbox,
  Divider,
  Anchor,
} from "@mantine/core";
import { z } from "zod";
import { useForm } from "@mantine/form";
import { IconUser, IconMail, IconCalendar } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { keyframes } from "@emotion/react";
import { showNotification } from "@mantine/notifications";
import { useAuth } from "../../contexts/AuthContext";
import appointmentController from "../../Apis/controllers/appointmentControllers";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export default function ConsultationForm() {
  const router = useRouter();
  const { t, i18n } = useTranslation("appointments");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const { user } = useAuth();

  const schema = z.object({
    firstName: z
      .string()
      .min(1, { message: t("validation.firstName_required") }),
    lastName: z.string().min(1, { message: t("validation.lastName_required") }),
    email: z
      .string()
      .min(1, { message: t("validation.email_required") })
      .email({ message: t("validation.email_invalid") }),
    phone: z
      .string()
      .min(1, { message: t("validation.phone_required") })
      .regex(/^\+?[0-9]{10,15}$/, { message: t("validation.phone_invalid") }),
    serviceType: z
      .string()
      .min(1, { message: t("validation.serviceType_required") }),
    preferredDate: z
      .string()
      .min(1, { message: t("validation.date_required") }),
    preferredTime: z
      .string()
      .min(1, { message: t("validation.time_required") }),
    concerns: z
      .string()
      .min(10, { message: t("validation.concerns_min") })
      .max(1000, { message: t("validation.concerns_max") }),
    medicalHistory: z.string().optional(),
    termsAccepted: z.boolean().refine((value) => value === true, {
      message: t("validation.terms_required"),
    }),
  });

  const form = useForm({
    initialValues: {
      userId: user?.id ?? null,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phoneNumber ?? "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      concerns: "",
      medicalHistory: "",
      termsAccepted: false,
    },
    validate: (values) => {
      try {
        schema.parse(values);
        return {};
      } catch (error) {
        const formattedErrors: Record<string, string> = {};
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            if (err.path.length > 0) {
              formattedErrors[err.path[0]] = err.message;
            }
          });
        }
        return formattedErrors;
      }
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        userId: user.id ?? "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await appointmentController.CreateAppointmentAsync(values);
      console.log(res);
      if (res.success) {
        showNotification({
          title: t("notifications.success_title"),
          message: t("notifications.success_message"),
          autoClose: 2000,
        });
        form.reset();
        router.push(`/${currentLang}/`);
      } else {
        showNotification({
          title: t("sendRequests.notifications.error_title"),
          message: res.message || t("sendRequests.notifications.error_message"),
          color: "red",
          autoClose: 2000,
        });
      }
    } catch {
      showNotification({
        title: t("notifications.error_title"),
        message: t("notifications.error_message"),
        autoClose: 2000,
      });
    }
  };

  const serviceOptions = [
    { value: "teeth_whitening", label: t("services.teeth_whitening") },
    { value: "dental_botox", label: t("services.dental_botox") },
    { value: "veneers", label: t("services.veneers") },
    { value: "facial_fillers", label: t("services.facial_fillers") },
    { value: "routine_checkup", label: t("services.routine_checkup") },
    { value: "emergency", label: t("services.emergency") },
  ];

  const timeOptions = [
    { value: "morning", label: t("times.morning") },
    { value: "afternoon", label: t("times.afternoon") },
    { value: "evening", label: t("times.evening") },
  ];

  return (
    <Container size="md" py="xl" dir={isRTL ? "rtl" : "ltr"}>
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
        c="dimmed"
        mb="xl"
        style={{
          animation: `${fadeIn} 1s ease-out`,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("subtitle")}
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Divider
          label={t("sections.personal_info")}
          labelPosition="center"
          mb="md"
        />

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label={t("fields.firstName")}
              placeholder={t("placeholders.firstName")}
              leftSection={<IconUser size={16} />}
              mb="md"
              required
              disabled={!!user?.firstName}
              {...form.getInputProps("firstName")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label={t("fields.lastName")}
              placeholder={t("placeholders.lastName")}
              mb="md"
              required
              disabled={!!user?.lastName}
              {...form.getInputProps("lastName")}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label={t("fields.phone")}
              placeholder={t("placeholders.phone")}
              mb="md"
              required
              disabled={!!user?.phoneNumber}
              {...form.getInputProps("phone")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label={t("fields.email")}
              placeholder={t("placeholders.email")}
              leftSection={<IconMail size={16} />}
              mb="md"
              required
              type="email"
              disabled={!!user?.email}
              {...form.getInputProps("email")}
            />
          </Grid.Col>
        </Grid>

        <Divider
          label={t("sections.appointment_info")}
          labelPosition="center"
          mt="xl"
          mb="md"
        />

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label={t("fields.serviceType")}
              placeholder={t("placeholders.serviceType")}
              data={serviceOptions}
              mb="md"
              required
              {...form.getInputProps("serviceType")}
              leftSection={<IconCalendar size={16} />}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <TextInput
              type="date"
              label={t("fields.preferredDate")}
              mb="md"
              required
              {...form.getInputProps("preferredDate")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Select
              label={t("fields.preferredTime")}
              placeholder={t("placeholders.preferredTime")}
              data={timeOptions}
              mb="md"
              required
              {...form.getInputProps("preferredTime")}
            />
          </Grid.Col>
        </Grid>

        <Textarea
          label={t("fields.concerns")}
          placeholder={t("placeholders.concerns")}
          minRows={4}
          mb="md"
          required
          {...form.getInputProps("concerns")}
        />

        <Textarea
          label={t("fields.medicalHistory")}
          placeholder={t("placeholders.medicalHistory")}
          minRows={2}
          mb="md"
          {...form.getInputProps("medicalHistory")}
        />

        <Checkbox
          label={
            <>
              <Anchor target="_blank" size="sm" href={`/${currentLang}/terms`}>
                {t("links.agree")} <strong>{t("links.terms")}</strong>
              </Anchor>
              <Anchor
                target="_blank"
                size="sm"
                href={`/${currentLang}/privacy`}
              >
                {t("links.and")} <strong>{t("links.privacy")}</strong>
              </Anchor>
            </>
          }
          mb="xl"
          required
          {...form.getInputProps("termsAccepted", { type: "checkbox" })}
        />

        <Button
          type="submit"
          fullWidth
          size="md"
          mt="xl"
          loading={form.submitting}
          style={{ animation: `${fadeIn} 1.4s ease-out` }}
        >
          {t("buttons.submit")}
        </Button>
      </form>
    </Container>
  );
}
