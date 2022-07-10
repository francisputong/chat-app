import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
//@ts-ignore
import { Effect } from "react-notification-badge";
//@ts-ignore
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import { useHistory } from "react-router-dom";
import { getSender } from "../../config/helpers";
import { ChatState } from "../../Context/ChatProvider";
import { SearchUsersType } from "../../types";
import { InputField } from "../base/Input";
import Loader from "../base/Loader";
import ProfileModal from "./ProfileModal";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<SearchUsersType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingChat, setIsLoadingChat] = useState(false);

    const {
        user,
        chats,
        setChats,
        notification,
        setNotification,
        setSelectedChat,
    } = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter search value",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });

            return;
        }

        try {
            setIsLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user!.token}`,
                },
            };

            const { data } = await axios.get(
                `/api/user?search=${search}`,
                config
            );

            setIsLoading(false);
            setSearchResult(data);
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Failed to load search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId: string) => {
        setIsLoadingChat(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user!.token}`,
                },
            };

            const { data } = await axios.post("/api/chat", { userId }, config);

            if (chats && !chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
            }

            setIsLoadingChat(false);
            onClose();
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Failed to load chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    return (
        <>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                bg='white'
                w='100%'
                p='5px 10px'
                borderWidth='5px'
            >
                <Tooltip
                    label='Search users to chat'
                    hasArrow
                    placement='bottom-end'
                >
                    <Button onClick={onOpen} variant='ghost'>
                        <i className='fas fa-search' />
                        <Text display={{ base: "none", md: "flex" }} px='4'>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize='2xl' fontFamily='work sans'>
                    Chat App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <BellIcon fontSize='2xl' m={1} />
                        </MenuButton>
                        <MenuList>
                            {!notification.length && (
                                <Text pl={2}>No new messages</Text>
                            )}
                            {notification.map((notif) => {
                                return (
                                    <MenuItem
                                        key={notif._id}
                                        onClick={() => {
                                            setSelectedChat(notif.chat);
                                            setNotification(
                                                notification.filter(
                                                    (n) => n !== notif
                                                )
                                            );
                                        }}
                                    >
                                        {notif.chat.isGroupChat
                                            ? `New message in ${notif.chat.chatName}`
                                            : `New message from ${getSender(
                                                  user!,
                                                  notif.chat.users
                                              )}`}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size='sm'
                                cursor='pointer'
                                name={user?.name}
                                src={user?.profilePicture}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
                        Search Users
                    </DrawerHeader>
                    <DrawerBody>
                        <Box display='flex' alignItems='center' pb={2}>
                            <InputField
                                value={search}
                                placeholder='Search by name or email'
                                name='search'
                                handleOnChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                            <Button ml={2} onClick={handleSearch}>
                                Go
                            </Button>
                        </Box>
                        {isLoading ? (
                            <Loader numberOfSkeleton={10} />
                        ) : (
                            searchResult.map((user) => {
                                return (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() =>
                                            accessChat(user._id)
                                        }
                                    />
                                );
                            })
                        )}
                        {isLoadingChat && <Spinner ml='auto' display='flex' />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer;
