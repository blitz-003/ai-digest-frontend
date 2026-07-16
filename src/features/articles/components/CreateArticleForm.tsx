"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { toast } from "sonner";

import {
  createArticleSchema,
  type CreateArticleSchema,
} from "../validation/createArticle.schema";

import { useCreateArticle } from "../hooks/useCreateArticle";

import { useCategories } from "@/features/categories/hooks/useCategories";

import ArticleEditor from "./ArticleEditor";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background */}

      <div className="pointer-events-none absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-100/30 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-purple-100/20 blur-3xl" />

      <div className="relative container mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Write an Article
          </h1>

          <p className="mt-3 text-muted-foreground">
            Share AI news, tutorials, research and insights with the community.
          </p>
        </div>

        <Card className="mx-auto max-w-4xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl">
              Create Article
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Title */}

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>

                <Input
                  id="title"
                  placeholder="Enter article title..."
                  {...register("title")}
                />

                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Summary */}

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>

                <Textarea
                  id="summary"
                  rows={4}
                  placeholder="Write a short summary..."
                  {...register("summary")}
                />

                {errors.summary && (
                  <p className="text-sm text-red-500">
                    {errors.summary.message}
                  </p>
                )}
              </div>

              {/* Category */}

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>

                <select
                  id="category"
                  {...register("category_id")}
                  disabled={categoriesLoading}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
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

              {/* Cover Image */}

              <div className="space-y-2">
                <Label htmlFor="cover_image">Cover Image URL</Label>

                <Input
                  id="cover_image"
                  placeholder="https://example.com/image.jpg"
                  {...register("cover_image")}
                />

                {errors.cover_image && (
                  <p className="text-sm text-red-500">
                    {errors.cover_image.message}
                  </p>
                )}
              </div>

              {/* Content */}

              <div className="space-y-2">
                <Label>Content</Label>

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

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Publishing..." : "Publish Article"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
