"use client";

import React, { useState } from "react";
import { Minimize2 } from "lucide-react";
import ErrorCard from "./ErrorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ErrorNote {
  id: number;
  note: string;
  isCompleted: boolean;
}

interface ErrorNotesMaximizedProps {
  setIsMinimized?: (value: boolean) => void;
}

const ErrorNotesMaximized: React.FC<ErrorNotesMaximizedProps> = ({
  setIsMinimized,
}) => {
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
    // More initial notes...
  ];

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

  return (
    <div className="bg-purple-100 rounded-xl h-full w-full border border-[#9654F426] pt-10 shadow-md">
      <div className="hidden md:flex justify-between items-center px-4">
        <h2 className="text-xl md:text-2xl font-medium mb-4">Error Notes</h2>
        <button
          className="size-8 flex justify-center rounded-lg items-center bg-white border border-[#D3D3D3]"
          onClick={() => setIsMinimized && setIsMinimized(true)}
        >
          <Minimize2 className="size-6" color="#6B6B6B" />
        </button>
      </div>
      <Tabs defaultValue="errorsNow" className="w-full">
        <TabsList className="bg-white flex justify-around rounded-none items-start h-full">
          <TabsTrigger
            value="errorsNow"
            className="font-semibold text-xl md:text-3xl decoration-4 data-[state=active]:underline data-[state=active]:underline-offset-[16px] bg-transparent text-black data-[state=active]:text-[#9654F4]"
          >
            Errors Now
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="font-semibold text-xl md:text-3xl decoration-4 data-[state=active]:underline data-[state=active]:underline-offset-[16px] bg-transparent text-black data-[state=active]:text-[#9654F4]"
          >
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="errorsNow" className="overflow-y-hidden p-4 md:p-5">
          <div className="w-full p-3 border bg-white border-gray-300 flex flex-col gap-2 rounded-xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write an error note here..."
              rows={5}
              className="bg-transparent outline-none w-full"
            />
            <div className="flex justify-center">
              <button
                onClick={handleAddNote}
                className="bg-purple-500 text-white px-6 rounded py-1"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-xl md:text-2xl text-stone-600 text-center mb-2">
              Your Errors
            </h3>
            <div className="overflow-y-hidden">
              {notes
                .filter((note) => !note.isCompleted)
                .map((note) => (
                  <ErrorCard
                    isMinimized={false}
                    id={String(note.id)}
                    key={note.id}
                    isCompleted={note.isCompleted}
                    note={note.note}
                  />
                ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="completed" className="overflow-y-hidden p-4 md:p-5">
          <div className="mt-4">
            <h3 className="font-medium text-xl md:text-2xl text-stone-600 text-center mb-2">
              Completed Errors
            </h3>
            <div className="overflow-y-hidden">
              {notes
                .filter((note) => note.isCompleted)
                .map((note) => (
                  <ErrorCard
                    isMinimized={false}
                    id={String(note.id)}
                    key={note.id}
                    isCompleted={note.isCompleted}
                    note={note.note}
                  />
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ErrorNotesMaximized;
