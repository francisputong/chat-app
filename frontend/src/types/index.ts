export type ChatType = {
    isGroupChat: boolean;
    users: UsersType[];
    _id: string;
    chatName: string;
};

export type UsersType = {
    name: string;
    email: string;
};
