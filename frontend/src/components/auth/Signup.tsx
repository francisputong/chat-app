import React, { useState } from "react";
import { Button, useToast, VStack } from "@chakra-ui/react";
import { InputField } from "../base/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

type Props = {};

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: File | null;
};

const Signup = ({}: Props): JSX.Element => {
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: null,
    });
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = ChatState();

    const history = useHistory();
    const toast = useToast();

    const postDetails = async (profilePicture: File) => {
        if (profilePicture === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (
            profilePicture.type === "image/jpeg" ||
            profilePicture.type === "image/png"
        ) {
            const data = new FormData();
            data.append("file", profilePicture);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dyh1tdfwy");
            try {
                const { data: responseData } = await axios.post(
                    `${process.env.REACT_APP_CLOUDINARY_URL!}/upload`,
                    data
                );

                return responseData.url;
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                return null;
            }
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setIsLoading(false);

            return;
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, files } = e.target;

        if (files && files?.length > 0) {
            setRegisterForm({ ...registerForm, profilePicture: files[0] });
        } else {
            setRegisterForm({ ...registerForm, [name]: value });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const { name, email, password, confirmPassword } = registerForm;

        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please fill all required fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setIsLoading(false);
            return;
        }

        let profilePictureUrl = null;
        if (registerForm.profilePicture) {
            const urlResponse = await postDetails(registerForm.profilePicture);
            if (urlResponse) profilePictureUrl = urlResponse;
            else return;
        }

        try {
            const { data } = await axios.post("/api/user", {
                name,
                email,
                password,
                profilePicture: profilePictureUrl,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setIsLoading(false);
            setUser(data);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Server error",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setIsLoading(false);
        }
    };

    return (
        <VStack>
            <InputField
                name='name'
                placeholder='Enter your name'
                value={registerForm.name}
                label='Name'
                handleOnChange={handleOnChange}
                isRequired
            />
            <InputField
                name='email'
                placeholder='Enter your email'
                value={registerForm.email}
                label='Email'
                handleOnChange={handleOnChange}
                isRequired
            />
            <InputField
                name='password'
                placeholder='Password'
                value={registerForm.password}
                label='Password'
                handleOnChange={handleOnChange}
                type={show ? "text" : "password"}
                rightElement={
                    <Button
                        onClick={() => setShow(!show)}
                        h='1.75rem'
                        size='sm'
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                }
                isRequired
            />
            <InputField
                name='confirmPassword'
                placeholder='Confirm password'
                value={registerForm.confirmPassword}
                label='Confirm password'
                handleOnChange={handleOnChange}
                type={show ? "text" : "password"}
                rightElement={
                    <Button
                        onClick={() => setShow(!show)}
                        h='1.75rem'
                        size='sm'
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                }
                isRequired
            />
            <InputField
                name='profilePicture'
                label='Upload your picture'
                type='file'
                handleOnChange={handleOnChange}
            />
            <Button
                colorScheme='blue'
                width='100%'
                color='white'
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
                isLoading={isLoading}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
