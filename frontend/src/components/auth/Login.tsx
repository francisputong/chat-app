import React, { useState } from "react";
import { Button, useToast, VStack } from "@chakra-ui/react";
import { InputField } from "../base/Input";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

type Props = {};

const Login = ({}: Props): JSX.Element => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = ChatState();

    const history = useHistory();
    const toast = useToast();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setLoginForm({ ...loginForm, [name]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        if (!loginForm.email || !loginForm.password) {
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

        try {
            const { data } = await axios.post("/api/user/login", {
                email: loginForm.email,
                password: loginForm.password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setIsLoading(false);
            toast({
                title: "Login successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setUser(data);
            history.push("/chats");
        } catch (error: any) {
            toast({
                title: error.response.data.message,
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
                name='email'
                placeholder='Enter your email'
                value={loginForm.email}
                label='Email'
                handleOnChange={handleOnChange}
                isRequired
            />
            <InputField
                name='password'
                placeholder='Password'
                value={loginForm.password}
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
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
                isLoading={isLoading}
            >
                Login
            </Button>
        </VStack>
    );
};

export default Login;
