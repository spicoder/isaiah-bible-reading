//
import React from "react";
import { notFound } from "next/navigation";
import { isaiahChapters } from "@/app/lib/data";
import StoryViewer from "@/app/components/StoryViewer";

export async function generateStaticParams() {
  return Object.keys(isaiahChapters).map((id) => ({ id }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = isaiahChapters[id];

  if (!chapter) {
    notFound();
  }

  // Calculate the next chapter ID by sorting the keys numerically
  const chapterIds = Object.keys(isaiahChapters).sort(
    (a, b) => Number(a) - Number(b)
  );
  const currentIndex = chapterIds.indexOf(id);
  const nextChapterId = chapterIds[currentIndex + 1] || null;

  // Pass the nextChapterId to the StoryViewer
  return <StoryViewer chapter={chapter} nextChapterId={nextChapterId} />;
}
