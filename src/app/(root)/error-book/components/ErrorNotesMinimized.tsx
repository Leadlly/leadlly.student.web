"use client";

import React, { useState } from "react";
import { Maximize2 } from "lucide-react";
import ErrorCard from "./ErrorCard";

interface ErrorNotesMinimizedProps {
  setIsMinimized: (value: boolean) => void;
}
interface ErrorNote {
  id: number;
  note: string;
  isCompleted: boolean;
}

const initialNotes: ErrorNote[] = [
  {
    id: 1,
    note: "Misunderstanding operations involving variables",
    isCompleted: false,
  },
  {
    id: 2,
    note: "Confusion between different types of angles or shapes",
    isCompleted: false,
  },
  {
    id: 3,
    note: "Confusion between different types of lenses and mirrors",
    isCompleted: true,
  },
  {
    id: 4,
    note: "Difficulties in understanding thermodynamics concepts",
    isCompleted: false,
  },
];

const ErrorNotesMinimized: React.FC<ErrorNotesMinimizedProps> = ({
  setIsMinimized,
}) => {
  const [notes, setNotes] = useState<ErrorNote[]>(initialNotes);
  const [input, setInput] = useState<string>("");

  const handleAddNote = () => {
    if (input.trim() !== "") {
      const newNote: ErrorNote = {
        id: notes.length + 1,
        note: input.trim(),
        isCompleted: false,
      };
      setNotes([...notes, newNote]);
      setInput("");
    }
  };

  const toggleComplete = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isCompleted: !note.isCompleted } : note
      )
    );
  };
  return (
    <div
      className="bg-purple-100 p-4 rounded-xl min-w-[310px] border border-[#9654F426] pt-10 shadow-md ml-10"
      style={{ boxShadow: "2px 1px 22.8px 5px #9654F41A" }}
    >
      <div className="flex justify-between items-baseline px-2">
        {" "}
        <h2 className="text-2xl font-medium mb-4">Error Notes</h2>
        <button
          className="size-8 flex justify-center rounded-lg items-center bg-white border  border-[#D3D3D3]"
          style={{ boxShadow: "1.54px 3.08px 4.85px 0px #0000001A inset" }}
          onClick={() => setIsMinimized(false)}
        >
          <Maximize2 className="size-6 " color="#6B6B6B" />
        </button>
      </div>

      <div
        className="w-full p-3 border bg-white border-gray-300 flex flex-col gap-2 max-h-60   rounded-xl "
        style={{ boxShadow: "0px 1px 40.2px -13px #00000040" }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write an error note here..."
          rows={5}
          className="bg-transparent outline-none"
        />
        <div className="items-center flex justify-center">
          {" "}
          <button
            onClick={handleAddNote}
            className="bg-purple-500 text-white py-1 px-5 rounded "
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-medium text-lg text-center mb-2">Your Errors</h3>

        <div className="overflow-y-hidden">
          {notes.slice(0, 5).map((note, index) => (
            <ErrorCard
              id={String(note.id)}
              key={note.id}
              isCompleted={note.isCompleted}
              note={note.note}
            />
          ))}
        </div>
        {notes.length > 4 ? <p>See more</p> : null}
      </div>
    </div>
  );
};

export default ErrorNotesMinimized;
