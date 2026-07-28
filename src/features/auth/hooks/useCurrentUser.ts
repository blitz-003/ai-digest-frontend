"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCurrentUser } from "../services/auth.service";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: (failureCount, error: AxiosError) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
