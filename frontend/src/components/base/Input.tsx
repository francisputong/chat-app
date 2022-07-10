import React, { InputHTMLAttributes } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    value?: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    rightElement?: JSX.Element;
    mb?: number;
    type?: string;
    variant?: "filled" | "flushed" | "outline";
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    size: _,
    value,
    isInvalid,
    isRequired,
    rightElement,
    mb,
    variant,
    type = "text",
    handleOnChange,
    ...props
}) => {
    return (
        <FormControl isInvalid={isInvalid} isRequired={isRequired}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup>
                <Input
                    style={type === "file" ? { border: "none" } : {}}
                    onChange={(e) => handleOnChange(e)}
                    variant={variant}
                    type={type}
                    {...props}
                    id={name}
                    name={name}
                    value={value}
                    mb={mb}
                />
                {rightElement && (
                    <InputRightElement width='4.5rem'>
                        {rightElement}
                    </InputRightElement>
                )}
                {isInvalid ? (
                    <FormErrorMessage>Required Field</FormErrorMessage>
                ) : null}
            </InputGroup>
        </FormControl>
    );
};
