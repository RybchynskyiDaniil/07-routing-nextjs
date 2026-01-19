import { fetchNotes } from "../../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "../../../../types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const targetTag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { currentPage: 1, search: "", tag: targetTag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: targetTag,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={targetTag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
