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
    mutation.mutate(data, {
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
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-[#4F8CFF]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-[#34D399]/12 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#A855F7]/10 blur-[120px]" />

      <div className="relative container mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4F8CFF]/20 bg-[#4F8CFF]/5 px-4 py-2 text-sm font-medium text-[#4F8CFF]">
            <FileText className="h-4 w-4" />
            Article Editor
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Write an{" "}
            <span className="text-[#7DAAFF]">
              Article
            </span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Share AI news, tutorials, research, and insights with the community.
          </p>
        </motion.div>

        {/* Editor Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">Title</Label>
              <Input
                id="title"
                placeholder="Enter article title..."
                className="h-12 text-lg"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-base font-semibold">Summary</Label>
              <Textarea
                id="summary"
                rows={3}
                placeholder="Write a short summary..."
                className="resize-none text-base"
                {...register("summary")}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">
                  {errors.summary.message}
                </p>
              )}
            </div>

            {/* Meta row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  id="category"
                  {...register("category_id")}
                  disabled={categoriesLoading}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm transition focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/20 focus:outline-none"
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
                  <p className="text-sm text-red-500">
                    {errors.category_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input
                  id="cover_image"
                  placeholder="https://example.com/image.jpg"
                  className="h-12"
                  {...register("cover_image")}
                />
                {errors.cover_image && (
                  <p className="text-sm text-red-500">
                    {errors.cover_image.message}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

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
                <p className="text-sm text-red-500">
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
                    Publish Article
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
