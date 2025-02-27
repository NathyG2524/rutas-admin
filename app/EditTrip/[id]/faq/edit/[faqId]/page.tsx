"use client"; // Required for Next.js App Router

import { useParams, useRouter } from "next/navigation";
import { useGetFaqByIdQuery, useUpdateFaqMutation } from "@/store/rutas.api" ;
import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Loader, Alert, Title, Group } from "@mantine/core";
import { useEffect } from "react";
import { IconArrowLeft } from "@tabler/icons-react";

export default function EditFaq() {
  const { faqId: faqId, id } = useParams(); // Get FAQ ID from URL
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
      upcomingTripId: id || ' ' // Assuming upcoming trip ID is passed as a prop
    },
  });

  // Populate form when data is available
  useEffect(() => {
    if (data) {
      form.setValues({
        question_en: data.question.en,
        question_es: data.question.es,
        answer_en: data.answer.en,
        answer_es: data.answer.es,
        type: data.type || "logistic",
        upcomingTripId: id,
      });
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = async (values:any) => {
    await updateFaq({ faqId, updatedData: values });
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
        {/* <Alert color="red">Failed to load FAQ: {error.message}</Alert> */}
      </Container>
    );

  return (
    <Container className="mt-20">
          <Group align="start" >
          <IconArrowLeft className="cursor-pointer" onClick={()=>router.back()} />
      <Title order={2} mb="md">
        Edit FAQ
      </Title>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput className="my-2" label="Question (English)" {...form.getInputProps("question_en")} required />
        <TextInput className="my-2"  label="Question (Spanish)" {...form.getInputProps("question_es")} required />
        <TextInput className="my-2"  label="Answer (English)" {...form.getInputProps("answer_en")} required />
        <TextInput className="my-2"  label="Answer (Spanish)" {...form.getInputProps("answer_es")} required />

        <Button type="submit" mt="md" loading={isUpdating}>
          Update FAQ
        </Button>
      </form>
    </Container>
  );
}
