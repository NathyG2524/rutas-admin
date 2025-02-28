"use client"; // Ensure this runs on the client side

import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Select, Button, Box, Group } from "@mantine/core";
// import { showNotification } from "@mantine/notifications";
import { z } from "zod";
import { useCreateFaqMutation } from "@/store/rutas.api";
import { useParams, useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { Router } from "next/router";

const faqSchema = z.object({
  question_en: z.string().min(1, "Question (EN) is required"),
  question_es: z.string().min(1, "Question (ES) is required"),
  answer_en: z.string().min(1, "Answer (EN) is required"),
  answer_es: z.string().min(1, "Answer (ES) is required"),
  type: z.enum(["Logistics", "Information about the route", "Reserve and Condition", "user Information"]),
  upcomingTripId: z.string().uuid("Invalid Trip ID"),
});

export default function CreateFaqForm() {
  const { id } = useParams(); // Get trip ID from URL
  const router = useRouter();
  const form = useForm({
    validate: zodResolver(faqSchema),
    initialValues: {
      question_en: "",
      question_es: "",
      answer_en: "",
      answer_es: "",
      type: "logistic",
      upcomingTripId: id || "", // Autofill from URL
    },
  });

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        question: { en: values.question_en, es: values.question_es },
        answer: { en: values.answer_en, es: values.answer_es },
        type: values.type,
        upcomingTripId: values.upcomingTripId,
      };

      await createFaq(formData).unwrap();

    //   showNotification({
    //     title: "Success",
    //     message: "FAQ added successfully",
    //     color: "green",
    //   });

      form.reset(); // Reset form after success
    } catch (error) {
    //   showNotification({
    //     title: "Error",
    //     message:  "Failed to add FAQ",
    //     color: "red",
    //   });
    }
  };
 
  return (
    <Box className=" " maw={800} m="auto">
        <Group align="center">
        <IconArrowLeft className="cursor-pointer" onClick={()=>router.back()} />
        <h2 className="text-xl  mt-20 font-semibold capitalize">Add New FAQ</h2>
        </Group>

       
      <form className="pl-20 pt-10" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput className="py-2" label="Question (English)" {...form.getInputProps("question_en")} />
        <TextInput className="py-2"  label="Question (Spanish)" {...form.getInputProps("question_es")} />
        <TextInput className="py-2"  label="Answer (English)" {...form.getInputProps("answer_en")} />
        <TextInput className="py-2"  label="Answer (Spanish)" {...form.getInputProps("answer_es")} />
        <Select
          label="Type"
          data={["Logistics", "Information about the route", "Reserve and Condition", "user Information"]}
          {...form.getInputProps("type")}
        />
        {/* <TextInput label="Upcoming Trip ID" {...form.getInputProps("upcomingTripId")} disabled /> */}
        <Button type="submit" mt="md" loading={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
}
