"use client";

import { useAuth } 
from "@/features/auth/context/AuthContext";


export default function Navbar(){


const {
    user,
    isAuthenticated,
    isLoading
}=useAuth();



console.log({
    user,
    isAuthenticated,
    isLoading
});


return (
    <nav>
        Navbar
    </nav>
)

}