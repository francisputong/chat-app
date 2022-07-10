import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { getSender, getSenderFull } from "../../config/helpers";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

type Props = {
    fetchAgain: boolean;
    setFetchAgain: Dispatch<SetStateAction<boolean>>;
};

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

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
                                />
                            </>
                        )}
                    </Text>
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
