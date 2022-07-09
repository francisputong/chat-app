export type ChatType = {
    isGroupChat: boolean;
    users: SearchUsersType[];
    latestMessage?: any;
    _id: string;
    chatName: string;
};

export type UsersType = {
    name: string;
    email: string;
    profilePicture: string;
    token: string;
    _id: string;
};

export type SearchUsersType = {
    createdAt: string;
    email: string;
    name: string;
    profilePicture: string;
    updatedAt: string;
    _id: string;
};
