"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../components/Modal/Modal";
import Loading from "../../../loading";
import { fetchNoteById } from "../../../../lib/api";
import css from "./NotePreview.client.module.css";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const close = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <button type="button" className={css.button} onClick={close}>
          Close
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>Created at: {note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
