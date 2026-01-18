"use client";
import NoteList from "../../components/NoteList/NoteList";
import css from "./Notes.module.css";
import { fetchNotes } from "../../lib/api";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setPage(1);
  }, 1000);

  const handleSearch = (text: string) => {
    setSearch(text);
    debounced(text);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedQuery],
    queryFn: () => fetchNotes(page, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox value={search} onChange={handleSearch} />}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
        {
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        }
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {isSuccess && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
