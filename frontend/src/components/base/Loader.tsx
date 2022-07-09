import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {
    numberOfSkeleton?: number;
};

const Loader = ({ numberOfSkeleton = 1 }: Props) => {
    const numberArray = Array.from(Array(numberOfSkeleton).keys());

    return (
        <Stack>
            {numberArray.map(() => (
                <Skeleton height='45px' />
            ))}
        </Stack>
    );
};

export default Loader;
