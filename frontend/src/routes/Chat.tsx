import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatType } from "../types";

type Props = {};

const Chat = ({}: Props) => {
    const [chats, setChats] = useState<ChatType[]>([]);

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        const { data } = await axios.get("/api/chat");
        setChats(data);
    };

    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id}>{chat.chatName}</div>
            ))}
        </div>
    );
};

export default Chat;
