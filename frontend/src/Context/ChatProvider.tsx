import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatType, UsersType } from "../types";

type ContextType = {
    user: UsersType | null;
    selectedChat: ChatType | null;
    chats: ChatType[];
    notification: any[];
    setNotification: any;
    setChats: any;
    setUser: any;
    setSelectedChat: any;
};

const ChatContext = createContext<ContextType>({
    user: null,
    selectedChat: null,
    chats: [],
    notification: [],
    setNotification: () => {},
    setChats: () => {},
    setUser: () => {},
    setSelectedChat: () => {},
});

const ChatProvider = ({ children }: any) => {
    const [user, setUser] = useState<UsersType | null>(null);
    const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
    const [chats, setChats] = useState<ChatType[]>([]);
    const [notification, setNotification] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            history.push("/");
        }
    }, [history]);

    return (
        <ChatContext.Provider
            value={{
                user,
                chats,
                selectedChat,
                notification,
                setNotification,
                setChats,
                setUser,
                setSelectedChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
