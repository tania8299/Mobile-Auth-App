import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const { token } = useContext(AuthContext);

    const {data,isLoading,error,isFetching,} = useQuery({
        queryKey: ["profile", token],
        queryFn: () => getProfile(token),
        enabled: !!token,
    });

    if (isLoading) return <p>Loading profile...</p>;

    if (error)
        return (
            <p className="text-red-500">
                Error loading profile
            </p>
        );

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Profile</h2>

            {isFetching && <p>Refreshing...</p>}

            <pre className="bg-gray-100 p-2 mt-2 rounded">
                {JSON.stringify(data?.data, null, 2)}
            </pre>
        </div>
    );
}