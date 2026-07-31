"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Minus,
  Strikethrough,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor;
}

const ToolButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
      isActive
        ? "bg-surface-strong text-ink"
        : "text-body hover:bg-muted hover:text-ink",
      disabled && "cursor-not-allowed opacity-40",
    )}
  >
    {children}
  </button>
);

export default function EditorToolbar({ editor }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-hairline px-4 py-2">
      <ToolButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <Strikethrough className="h-4 w-4" />
      </ToolButton>

      <div className="mx-1 h-5 w-px bg-hairline" />

      <ToolButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        isActive={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        isActive={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 className="h-4 w-4" />
      </ToolButton>

      <div className="mx-1 h-5 w-px bg-hairline" />

      <ToolButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <List className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolButton>

      <div className="mx-1 h-5 w-px bg-hairline" />

      <ToolButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <Quote className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      >
        <Code className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </ToolButton>

      <div className="mx-1 h-5 w-px bg-hairline" />

      <ToolButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </ToolButton>

      <ToolButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </ToolButton>
    </div>
  );
}
