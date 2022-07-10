import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { ChatType } from "../types";
import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../components/modules/ChatBox";
import MyChats from "../components/modules/MyChats";
import SideDrawer from "../components/modules/SideDrawer";

type Props = {};

const Chat = ({}: Props) => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                display='flex'
                justifyContent='space-between'
                w='100%'
                h='91.5vh'
                p='10px'
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                    <ChatBox
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                    />
                )}
            </Box>
        </div>
    );
};

export default Chat;
