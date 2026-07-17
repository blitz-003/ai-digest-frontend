import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { createArticle } from "../services/article.service";

export const useCreateArticle = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArticle,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success("Article published!");

      router.push("/articles");
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        if (typeof detail === "string") {
          toast.error(detail);
        } else if (Array.isArray(detail)) {
          toast.error(detail[0]?.msg ?? "Failed to publish article");
        } else {
          toast.error("Failed to publish article");
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
