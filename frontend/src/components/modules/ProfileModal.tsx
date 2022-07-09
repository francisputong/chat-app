import { ViewIcon } from "@chakra-ui/icons";
import {
    Button,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { UsersType } from "../../types";

type Props = {
    user: UsersType | null;
    children: any;
};

const ProfileModal = ({ user, children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                <ModalContent h='410px'>
                    <ModalHeader>{user?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={user?.profilePicture}
                            alt={user?.name}
                        />
                        <Text fontSize={{ base: "28px", md: "30px" }}>
                            Email: {user?.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileModal;
