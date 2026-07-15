"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { queryClient } from "@/lib/query-client";
import { logout } from "../services/auth.service";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      queryClient.setQueryData(["current-user"], null);

      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });

      router.replace("/");

      router.refresh();
    },
  });
};