import { Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat/SingleChat";

type Props = {
    fetchAgain: boolean;
    setFetchAgain: Dispatch<SetStateAction<boolean>>;
};

const ChatBox = ({ fetchAgain, setFetchAgain }: Props) => {
    const { selectedChat } = ChatState();
    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems='center'
            flexDir='column'
            p={3}
            bg='white'
            w={{ base: "100%", md: "68%" }}
            borderWidth='1px'
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default ChatBox;
