import { SearchUsersType, UsersType } from "../types";

export const getSender = (
    loggedUser: UsersType,
    users: SearchUsersType[]
): string => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (
    loggedUser: UsersType,
    users: SearchUsersType[]
): SearchUsersType => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSenderMargin = (
    messages: any,
    m: any,
    i: any,
    userId: string
) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 36;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameSender = (
    messages: any,
    m: any,
    i: number,
    userId: string
) => {
    return (
        i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages: any, i: number, userId: string) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};
