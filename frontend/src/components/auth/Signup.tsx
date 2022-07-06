import React, { useState } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { InputField } from "../base/Input";

type Props = {};

const Signup = ({}: Props): JSX.Element => {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
    });
    const [show, setShow] = useState(false);

    const postDetails = (profilePicture: File) => {};

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name, files } = e.target;

        if (files && files?.length > 0) {
            postDetails(files[0]);
        } else {
            setRegisterForm({ ...registerForm, [name]: value });
        }
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
                value={registerForm.profilePicture}
                label='Upload your picture'
                type='file'
                handleOnChange={handleOnChange}
            />
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
