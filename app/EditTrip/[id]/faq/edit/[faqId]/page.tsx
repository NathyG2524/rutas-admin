"use client"; // Required for Next.js App Router

import { useParams, useRouter } from "next/navigation";
import { useGetFaqByIdQuery, useUpdateFaqMutation } from "@/store/rutas.api";
import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Loader, Title, Group } from "@mantine/core";
import { useEffect } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

export default function EditFaq() {
  const { faqId } = useParams(); // Get FAQ ID from URL
  const router = useRouter();

  // Fetch the existing FAQ details
  const { data, error, isLoading } = useGetFaqByIdQuery(faqId);
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  // Initialize form
  const form = useForm({
    initialValues: {
      question_en: "",
      question_es: "",
      answer_en: "",
      answer_es: "",
      type: "logistic",
      upcomingTripId: "", // Initialize with an empty string or value you need
    },
  });

  // Populate form when data is available
  useEffect(() => {
    if (data) {
      form.setValues({
        question_en: data.question?.en || "",
        question_es: data.question?.es || "",
        answer_en: data.answer?.en || "",
        answer_es: data.answer?.es || "",
        type: data.type || "logistic",
        upcomingTripId: data.upcomingTripId || "", // Use the dynamic value from API response
      });
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = async (values: any) => {
    const payload = {
      id: faqId, // Use the faqId as the ID
      question: {
        en: values.question_en,
        es: values.question_es,
      },
      answer: {
        en: values.answer_en,
        es: values.answer_es,
      },
      type: values.type,
      upcomingTripId: values.upcomingTripId,
    };

    await updateFaq({ faqId, updatedData: payload });
    router.back(); // Redirect to FAQ list
  };

  if (isLoading)
    return (
      <Container>
        <Loader />
      </Container>
    );

  if (error)
    return (
      <Container>
        {/* Optionally handle error display */}
      </Container>
    );

  return (
    <Container className="mt-20">
      <Group align="start">
        <IconArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <Title order={2} mb="md">
          Edit FAQ
        </Title>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          className="my-2"
          label="Question (English)"
          {...form.getInputProps("question_en")}
          required
        />
        <TextInput
          className="my-2"
          label="Question (Spanish)"
          {...form.getInputProps("question_es")}
          required
        />
        <TextInput
          className="my-2"
          label="Answer (English)"
          {...form.getInputProps("answer_en")}
          required
        />
        <TextInput
          className="my-2"
          label="Answer (Spanish)"
          {...form.getInputProps("answer_es")}
          required
        />

        <Button type="submit" mt="md" loading={isUpdating}>
          Update FAQ
        </Button>
      </form>
    </Container>
  );
}
