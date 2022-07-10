import { useState } from "react";
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
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { SearchUsersType } from "../../types";
import AppBadge from "../base/Badge";
import { InputField } from "../base/Input";
import UserListItem from "./UserListItem";
import useSearch from "../../hooks/useSearch";

type Props = {
    children: any;
};

const GroupChatModal = ({ children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<SearchUsersType[]>([]);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const { searchResult, isLoading, handleSearch } = useSearch();

    const handleSubmit = async () => {
        if (!groupChatName) {
            toast({
                title: "Please add a group chat name.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            return;
        }

        if (selectedUsers.length === 0) {
            toast({
                title: "Please select users to add to the group chat.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const { data } = await axios.post(
                "/api/chat/group",
                {
                    name: groupChatName,
                    users: JSON.stringify(
                        selectedUsers.map((user) => user._id)
                    ),
                },
                config
            );

            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New group chat created.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to create the group chat.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const handleGroup = (user: SearchUsersType) => {
        if (selectedUsers.includes(user)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, user]);
    };

    const handleDelete = (userToDelete: SearchUsersType) => {
        setSelectedUsers(
            selectedUsers.filter((user) => user._id !== userToDelete._id)
        );
    };

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                    aria-label='view'
                    display={{ base: "flex" }}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                />
            )}
            <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <InputField
                            name='chatName'
                            mb={3}
                            placeholder='Chat Name'
                            handleOnChange={(e) =>
                                setGroupChatName(e.target.value)
                            }
                        />
                        <InputField
                            name='addUsers'
                            mb={1}
                            placeholder='Add Users'
                            handleOnChange={(e) => handleSearch(e.target.value)}
                        />
                        <Box w='100%' display='flex' flexWrap='wrap'>
                            {selectedUsers.map((user) => {
                                return (
                                    <AppBadge
                                        key={user._id}
                                        admin='1'
                                        user={user}
                                        handleFunction={() =>
                                            handleDelete(user)
                                        }
                                    />
                                );
                            })}
                        </Box>
                        {isLoading ? (
                            <div>loading</div>
                        ) : (
                            searchResult?.slice(0, 4).map((user) => {
                                return (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                );
                            })
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={handleSubmit}
                        >
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;
