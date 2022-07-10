import { ViewIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import useSearch from "../../hooks/useSearch";
import { SearchUsersType, UsersType } from "../../types";
import Badge from "../base/Badge";
import { InputField } from "../base/Input";
import UserListItem from "./UserListItem";

type Props = {
    fetchAgain: boolean;
    setFetchAgain: Dispatch<SetStateAction<boolean>>;
    handleGetMessages: () => void;
};

const UpdateGroupChatModal = ({
    fetchAgain,
    setFetchAgain,
    handleGetMessages,
}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState("");
    const [isRenameLoading, setIsRenameLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const { searchResult, isLoading, handleSearch } = useSearch();
    const toast = useToast();

    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setIsRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const { data } = await axios.put(
                "/api/chat/rename",
                { chatId: selectedChat?._id, chatName: groupChatName },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setIsRenameLoading(false);
        } catch (error) {
            toast({
                title: "Failed to rename group chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const handleRemove = async (userToRemove: SearchUsersType | UsersType) => {
        if (
            selectedChat?.groupAdmin._id !== user?._id &&
            userToRemove._id !== user?._id
        ) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setIsAdding(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const { data } = await axios.put(
                "/api/chat/groupremove",
                {
                    chatId: selectedChat?._id,
                    userId: userToRemove._id,
                },
                config
            );

            userToRemove._id === user?._id
                ? setSelectedChat()
                : setSelectedChat(data);

            setFetchAgain(!fetchAgain);
            handleGetMessages();

            setIsAdding(false);
        } catch (error) {
            toast({
                title: "Failed to add.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setIsAdding(false);
        }
    };

    const handleAddUser = async (userToAdd: SearchUsersType) => {
        if (selectedChat?.users.find((u) => u._id === userToAdd._id)) {
            toast({
                title: "User already in group.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (selectedChat?.groupAdmin._id === userToAdd._id) {
            toast({
                title: "Only admins can add someone.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setIsAdding(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const { data } = await axios.put(
                "/api/chat/groupadd",
                {
                    chatId: selectedChat?._id,
                    userId: userToAdd._id,
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setIsAdding(false);
        } catch (error) {
            toast({
                title: "Failed to add.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setIsAdding(false);
        }
    };

    return (
        <>
            <IconButton
                aria-label='view icon'
                display={{ base: "flex" }}
                icon={<ViewIcon />}
                onClick={onOpen}
            />
            <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedChat?.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w='100%' display='flex' flexWrap='wrap' pb={3}>
                            {selectedChat?.users.map((user) => {
                                return (
                                    <Badge
                                        admin='1'
                                        key={user._id}
                                        user={user}
                                        handleFunction={() =>
                                            handleRemove(user)
                                        }
                                    />
                                );
                            })}
                        </Box>
                        <Box display='flex' mb={3}>
                            <InputField
                                name='chatName'
                                placeholder='Chat Name'
                                value={groupChatName}
                                handleOnChange={(e) =>
                                    setGroupChatName(e.target.value)
                                }
                            />
                            <Button
                                variant='solid'
                                colorScheme='teal'
                                ml={1}
                                isLoading={isRenameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </Box>
                        <InputField
                            name='addUsers'
                            mb={1}
                            placeholder='Add Users'
                            handleOnChange={(e) => handleSearch(e.target.value)}
                        />
                        {isLoading ? (
                            <Spinner size='lg' />
                        ) : (
                            searchResult?.slice(0, 4).map((user) => {
                                return (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() =>
                                            handleAddUser(user)
                                        }
                                    />
                                );
                            })
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='red'
                            mr={3}
                            disabled={isAdding}
                            onClick={() => {
                                if (user) handleRemove(user);
                            }}
                        >
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateGroupChatModal;
