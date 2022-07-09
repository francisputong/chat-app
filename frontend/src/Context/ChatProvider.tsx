import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatType, UsersType } from "../types";

type ContextType = {
    user: UsersType | null;
    selectedChat: any;
    chats: ChatType[];
    setChats: any;
    setUser: any;
    setSelectedChat: any;
};

const ChatContext = createContext<ContextType>({
    user: null,
    selectedChat: null,
    chats: [],
    setChats: () => {},
    setUser: () => {},
    setSelectedChat: () => {},
});

const ChatProvider = ({ children }: any) => {
    const [user, setUser] = useState<UsersType | null>(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState<ChatType[]>([]);
    const history = useHistory();

    useEffect(() => {
        const user = localStorage.getItem("userInfo");
        if (user) {
            const parsedUSer = JSON.parse(user);
            setUser(parsedUSer);
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
