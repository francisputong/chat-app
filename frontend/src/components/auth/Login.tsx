import React, { useState } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { InputField } from "../base/Input";

type Props = {};

const Login = ({}: Props): JSX.Element => {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [show, setShow] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setRegisterForm({ ...registerForm, [name]: value });
    };

    const handleSubmit = () => {};

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
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </VStack>
    );
};

export default Login;
