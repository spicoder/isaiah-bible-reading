import React from 'react';
import { notFound } from 'next/navigation';
import { isaiahChapters } from '@/app/lib/data';
import StoryViewer from '@/app/components/StoryViewer';

export async function generateStaticParams() {
  return Object.keys(isaiahChapters).map((id) => ({ id }));
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = isaiahChapters[id];

  if (!chapter) {
    notFound();
  }

  // Render the immersive Story Viewer
  return <StoryViewer chapter={chapter} />;
}