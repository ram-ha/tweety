import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function useUser() {
    const { data, error } = useSWR("/api/users/me");
    const router = useRouter();
    useEffect(() => {
        if (data && !data.ok) {
            router.replace("/log-in");
        }
    }, [data, router]);
    return { user: data?.dbUser, isLoading: !data && !error };
}