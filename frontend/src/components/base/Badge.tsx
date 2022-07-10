import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import { SearchUsersType } from "../../types";

type Props = {
    user: SearchUsersType;
    handleFunction: () => void;
    admin: string;
};
const AppBadge = ({ user, handleFunction, admin }: Props) => {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius='lg'
            m={1}
            mb={2}
            textTransform='none'
            variant='solid'
            fontSize={12}
            colorScheme='purple'
            cursor='pointer'
            onClick={handleFunction}
        >
            {user.name}
            {admin === user._id && <span> (Admin)</span>}
            <CloseIcon pl={1} />
        </Badge>
    );
};

export default AppBadge;
