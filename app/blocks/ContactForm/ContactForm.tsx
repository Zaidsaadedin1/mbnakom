// components/ContactForm.tsx

import {
  TextInput,
  Textarea,
  Select,
  Button,
  Stack,
  Title,
  Paper,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useTranslation } from "next-i18next";
import { showNotification } from "@mantine/notifications";
import { z } from "zod";
import React, { useState } from "react";

// Define schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const { t } = useTranslation("home");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      showNotification({
        title: t("sendRequests.notifications.success_title") || "Success",
        message:
          t("sendRequests.notifications.success_message") ||
          "Message sent successfully!",
        color: "green",
      });

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      showNotification({
        title: t("sendRequests.notifications.error_title") || "Error",
        message:
          error instanceof Error
            ? error.message
            : t("sendRequests.notifications.error_message") ||
              "Failed to send message",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="xl" radius="xl" shadow="lg" pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Title order={3} mb="lg" ta="center">
        {t("contact_form_title") || "Contact Form"}
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label={t("form_name_label") || "Name"}
            placeholder={t("form_name_placeholder") || "Enter your name"}
            {...form.getInputProps("name")}
          />

          <TextInput
            label={t("form_email_label") || "Email"}
            placeholder={t("form_email_placeholder") || "Enter your email"}
            type="email"
            {...form.getInputProps("email")}
          />

          <TextInput
            label={t("form_phone_label") || "Phone"}
            placeholder={
              t("form_phone_placeholder") || "Enter your phone number"
            }
            type="tel"
            {...form.getInputProps("phone")}
          />

          <Select
            label={t("form_service_label") || "Service"}
            placeholder={t("form_service_placeholder") || "Select a service"}
            data={[
              {
                value: "individual",
                label: t("service_individual") || "Individual Therapy",
              },
              {
                value: "couples",
                label: t("service_couples") || "Couples Therapy",
              },
              {
                value: "family",
                label: t("service_family") || "Family Therapy",
              },
              {
                value: "group",
                label: t("service_group") || "Group Therapy",
              },
            ]}
            {...form.getInputProps("service")}
          />

          <Textarea
            label={t("form_message_label") || "Message"}
            placeholder={
              t("form_message_placeholder") || "Tell us about your needs"
            }
            autosize
            minRows={3}
            maxRows={8}
            {...form.getInputProps("message")}
          />

          <Button
            type="submit"
            variant="gradient"
            fullWidth
            mt="md"
            disabled={loading}
            loading={loading}
          >
            {loading ? "Sending..." : t("form_submit") || "Send Message"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
