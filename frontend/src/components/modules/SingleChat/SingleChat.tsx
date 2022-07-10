import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { getSender, getSenderFull } from "../../../config/helpers";
import { ChatState } from "../../../Context/ChatProvider";
import { InputField } from "../../base/Input";
import ProfileModal from "../ProfileModal";
import ScrollableChat from "../ScrollableChat";
import UpdateGroupChatModal from "../UpdateGroupChatModal";
import animationData from "../../../assets/typing-indicator.json";
import io from "socket.io-client";
import "./single-chat.css";

type Props = {
    fetchAgain: boolean;
    setFetchAgain: Dispatch<SetStateAction<boolean>>;
};

const ENDPOINT = "http://localhost:5000";
let socket: any, selectedChatCompare: any;

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
    const [messages, setMessages] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typing, setTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const {
        user,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
    } = ChatState();
    const toast = useToast();

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit("setup", user);
        socket.on("connected", () => {
            setSocketConnected(true);
        });
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        return () => {
            socket.off("setup");
            socket.off("connected");
            socket.off("typing");
        };
    }, []);

    useEffect(() => {
        handleGetMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived: any) => {
            console.log(newMessageReceived);
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const handleGetMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user!.token}`,
                },
            };

            setIsLoading(true);

            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );

            setMessages(data);
            setIsLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessage = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.code === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat?._id);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user!.token}`,
                    },
                };
                setNewMessage("");

                const { data } = await axios.post(
                    `/api/message`,
                    { content: newMessage, chatId: selectedChat?._id },
                    config
                );

                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to send message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat?._id);
        }
        const lastTypingTime = new Date().getTime();
        const timerLength = 3000;

        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength) {
                socket.emit("stop typing", selectedChat?._id);
                setTyping(false);
            }
        }, timerLength);
    };

    const TypingComp = () => {
        return (
            <>
                {isTyping ? (
                    <div>
                        <Lottie
                            options={defaultOptions}
                            width={70}
                            style={{
                                marginBottom: 15,
                                marginLeft: 0,
                            }}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    };
    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w='100%'
                        fontFamily='Work sans'
                        display='flex'
                        justifyContent={{ base: "space-between" }}
                        alignItems='center'
                    >
                        <IconButton
                            aria-label='back arrow'
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {user ? (
                                    <>
                                        {getSender(user, selectedChat.users)}
                                        <ProfileModal
                                            user={getSenderFull(
                                                user,
                                                selectedChat.users
                                            )}
                                        />
                                    </>
                                ) : (
                                    <div />
                                )}
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    handleGetMessages={handleGetMessages}
                                />
                            </>
                        )}
                    </Text>
                    <Box
                        display='flex'
                        flexDir='column'
                        justifyContent='flex-end'
                        p={3}
                        bg='#E8E8E8'
                        w='100%'
                        h='100%'
                        borderRadius='lg'
                        overflowY='hidden'
                    >
                        {isLoading ? (
                            <Spinner
                                size='xl'
                                w={20}
                                h={20}
                                alignSelf='center'
                                margin='auto'
                            />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat
                                    messages={messages}
                                    typingComponent={TypingComp}
                                />
                            </div>
                        )}
                        <Box mt={3}>
                            <InputField
                                variant='filled'
                                name='message'
                                placeholder='Enter a message'
                                onKeyDown={sendMessage}
                                isRequired={true}
                                handleOnChange={handleTyping}
                                value={newMessage}
                            />
                        </Box>
                    </Box>
                </>
            ) : (
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    h='100%'
                >
                    <Text fontSize='3xl' pb={3}>
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;
