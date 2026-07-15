import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { login } from "../services/auth.service";


export const useLogin = () => {


const queryClient = useQueryClient();

const router = useRouter();



return useMutation({

    mutationFn: login,


    onSuccess: async () => {

    console.log("Login successful");


    try {

        await queryClient.refetchQueries({
            queryKey:["current-user"],
        });


        console.log("User fetched");


    } catch(error){

        console.log("User fetch failed", error);

    }


    console.log("Redirecting");


    router.push("/");

}

});


};