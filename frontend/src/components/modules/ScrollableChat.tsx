import { Avatar, Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
} from "../../config/helpers";
import { ChatState } from "../../Context/ChatProvider";

type Props = {
    messages: Array<any>;
    typingComponent: () => JSX.Element;
};
const ScrollableChat = ({ messages, typingComponent }: Props) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages &&
                messages.map((message: any, i: number) => {
                    // console.log(
                    //     isSameSender(messages, message, i, user!._id),
                    //     i
                    // );
                    return (
                        <div
                            style={{ display: "flex", alignItems: "center" }}
                            key={message._id}
                        >
                            {(isSameSender(messages, message, i, user!._id) ||
                                isLastMessage(messages, i, user!._id)) && (
                                <Tooltip
                                    label={message.sender.name}
                                    placement='bottom-start'
                                    hasArrow
                                >
                                    <Avatar
                                        mt='10px'
                                        mr={1}
                                        size='sm'
                                        cursor='pointer'
                                        name={message.sender.name}
                                        src={message.sender.profilePicture}
                                    />
                                </Tooltip>
                            )}
                            <span
                                style={{
                                    color: "#FFFFFF",
                                    backgroundColor: `${
                                        message.sender._id === user?._id
                                            ? "#4173B8"
                                            : "grey"
                                    }`,
                                    borderRadius: "20px",
                                    padding: "5px 15px",
                                    maxWidth: "75%",
                                    marginLeft: isSameSenderMargin(
                                        messages,
                                        message,
                                        i,
                                        user!._id
                                    ),
                                    marginTop: 10,
                                }}
                            >
                                {message.content}
                            </span>
                        </div>
                    );
                })}
            {typingComponent()}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
