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
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-w-0 focus:outline-none min-h-[400px] px-8 py-6",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-card transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
      <EditorToolbar editor={editor} />
      <div className="min-h-[400px] min-w-0 overflow-x-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
