import type { Note, NoteTag } from "../types/note";
import axios from "axios";

const API_URL = "https://notehub-public.goit.study/api/notes";
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function fetchNotes(
  page?: number,
  search?: string
): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(API_URL, {
    params: {
      page,
      search,
    },
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function createNote(
  newNote: NewNoteData
): Promise<Note> {
  const response = await axios.post<Note>(API_URL, newNote, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function deleteNote(
  noteID: string
): Promise<Note> {
  const response = await axios.delete<Note>(`${API_URL}/${noteID}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function fetchNoteById(
  noteId: string
): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}