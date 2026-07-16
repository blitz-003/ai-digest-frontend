"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./EditorToolbar";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function ArticleEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className="
rounded-xl
border
bg-white
"
    >
      <EditorToolbar editor={editor} />

      <div
        className="
min-h-[300px]
p-4
prose
max-w-none
"
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
