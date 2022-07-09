import { SearchUsersType, UsersType } from "../types";

export const getSender = (loggedUser: UsersType, users: SearchUsersType[]) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
