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
