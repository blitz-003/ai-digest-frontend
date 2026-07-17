"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth.service";

export const useCurrentUser = () => {
  console.log("useCurrentUser hook");
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });
};
