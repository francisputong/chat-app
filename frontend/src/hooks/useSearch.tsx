import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { SearchUsersType } from "../types";

const useSearch = () => {
    const [searchResult, setSearchResult] = useState<SearchUsersType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = ChatState();
    const toast = useToast();

    const handleSearch = async (value: string) => {
        if (!value) {
            return;
        }

        try {
            setIsLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/user?search=${value}`,
                config
            );
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to load search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, searchResult, handleSearch };
};

export default useSearch;
