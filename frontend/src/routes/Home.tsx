import {
    Container,
    Box,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Home = (): JSX.Element => {
    const history = useHistory();

    useEffect(() => {
        const user = localStorage.getItem("userInfo");
        if (user) {
            history.push("/chats");
        }
    }, [history]);
    return (
        <Container display='flex' alignItems='center' maxW='xl' h='100vh'>
            {/* <Box
                display='flex'
                justifyContent='center'
                p={3}
                bg='white'
                w='100%'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text fontSize='4xl' fontFamily='Work sans'>
                    Chat App
                </Text>
            </Box> */}
            <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
                <Text
                    textAlign='center'
                    fontSize='4xl'
                    fontFamily='Work sans'
                    p={4}
                >
                    Chat App
                </Text>
                <Tabs variant='soft-rounded'>
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default Home;
