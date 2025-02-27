"use client"; // Needed for Next.js App Router

import { useParams, useRouter } from "next/navigation";
import { useDeleteFaqMutation, useGetFaqByTripIdQuery } from "@/store/rutas.api";
import { Loader, Alert, List, Text, Container, Title, Button, Group, ActionIcon, Stack } from "@mantine/core";
import { IconArrowLeft, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

export default function UpcomingTripFaq() {
  const { id: upcomingTripId } = useParams(); // Get the trip ID from the URL
  const { data, error, isLoading, refetch } = useGetFaqByTripIdQuery(upcomingTripId);
  const router = useRouter();
  const [deleteFaq] = useDeleteFaqMutation();

  const handleDelete = async (faqId: any) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await deleteFaq(faqId);
      refetch(); // Refresh the FAQ list after deletion
    }
  };

  // Group FAQs by their type
  const groupedFaqs = data?.items?.reduce((acc: any, faq: any) => {
    const type = faq.type || "Uncategorized"; // Default to "Uncategorized" if no type is provided
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(faq);
    return acc;
  }, {});

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
        <Title className="mt-20" order={2} mb="md">
          Frequently Asked Questions
        </Title>
      </Group>

      <Group justify="end">
        <Button leftSection={<IconPlus size={16} />} onClick={() => router.push("./faq/new")}>
          Add New
        </Button>
      </Group>

      {/* Loop through the grouped FAQ types */}
      {Object.keys(groupedFaqs).map((type) => (
        <div key={type}>
          <Title order={3} mt="lg" mb="sm">
            {type} {/* Display the FAQ type as the section title */}
          </Title>
          <List className="w-full" spacing="md" size="sm" withPadding>
            {groupedFaqs[type].map((faq: any, index: any) => (
              <Stack key={index} className="border-b w-full my-4">
                <Group wrap="nowrap" gap="xl" className="w-full py-2" justify="space-between">
                  <div>
                    <Text fw={500}>{faq.question.en}</Text>
                    <Text>{faq.answer.en}</Text>
                  </div>
                  <Group justify="end">
                    <ActionIcon color="blue" onClick={() => router.push(`./faq/edit/${faq.id}`)}>
                      <IconPencil size={18} />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => handleDelete(faq.id)}>
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Stack>
            ))}
          </List>
        </div>
      ))}
    </Container>
  );
}
