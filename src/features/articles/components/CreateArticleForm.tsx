"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FileText, Send } from "lucide-react";

import {
  createArticleSchema,
  type CreateArticleSchema,
} from "../validation/createArticle.schema";

import { useCreateArticle } from "../hooks/useCreateArticle";

import { useCategories } from "@/features/categories/hooks/useCategories";

import ArticleEditor from "./ArticleEditor";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateArticleForm() {
  const mutation = useCreateArticle();

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),

    defaultValues: {
      title: "",
      summary: "",
      content: "",
      cover_image: "",
      category_id: "",
    },
  });

  const content = watch("content");

  const onSubmit = (data: CreateArticleSchema) => {
    mutation.mutate(
      { ...data, status: "published" },
      {
      onError(error) {
        if (axios.isAxiosError(error)) {
          const detail = error.response?.data?.detail;

          if (typeof detail === "string") {
            toast.error(detail);
          } else {
            toast.error("Failed to publish article.");
          }
        } else {
          toast.error("Something went wrong.");
        }
      },
    });
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-canvas">
      <div className="container mx-auto min-w-0 max-w-4xl px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-4 py-1.5 label-uppercase text-primary">
            <FileText className="h-3.5 w-3.5" />
            Article editor
          </div>
          <h1 className="display-lg text-ink">Write an article</h1>
          <p className="mt-4 text-lg text-body">
            Share AI news, tutorials, research, and insights with the
            community.
          </p>
        </motion.div>

        {/* Editor Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter article title..."
                className="h-12 border-hairline-strong bg-surface-card text-lg focus-visible:border-primary focus-visible:ring-primary/20"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-base font-semibold">
                Summary
              </Label>
              <Textarea
                id="summary"
                rows={3}
                placeholder="Write a short summary..."
                className="resize-none border-hairline-strong bg-surface-card text-base focus-visible:border-primary focus-visible:ring-primary/20"
                {...register("summary")}
              />
              {errors.summary && (
                <p className="text-sm text-destructive">
                  {errors.summary.message}
                </p>
              )}
            </div>

            {/* Meta row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-base font-semibold">Category</Label>
                <select
                  id="category"
                  {...register("category_id")}
                  disabled={categoriesLoading}
                  className="h-12 w-full rounded-lg border border-hairline-strong bg-surface-card px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select category"}
                  </option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-sm text-destructive">
                    {errors.category_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  Cover image URL
                </Label>
                <Input
                  id="cover_image"
                  placeholder="https://example.com/image.jpg"
                  className="h-12 border-hairline-strong bg-surface-card focus-visible:border-primary focus-visible:ring-primary/20"
                  {...register("cover_image")}
                />
                {errors.cover_image && (
                  <p className="text-sm text-destructive">
                    {errors.cover_image.message}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-hairline" />

            {/* Content Editor */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Content</Label>
              <ArticleEditor
                value={content}
                onChange={(value) =>
                  setValue("content", value, {
                    shouldValidate: true,
                  })
                }
              />
              {errors.content && (
                <p className="text-sm text-destructive">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Publish */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="group h-12 px-8 text-base"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  "Publishing..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Publish article
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
