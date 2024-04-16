import { Box, Input, InputGroup, InputLeftElement, VStack, Text, Button, HStack, Grid } from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
import { Link } from "react-router-dom";

export default function LogIn() {
    return (
        <VStack mt={"10%"}>
            <VStack w={"25%"} borderBottomWidth={1}>
                <Text as={"b"} fontSize={"3xl"} mb={3}>BookWarms</Text>
                <InputGroup>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaUser/>
                        </Box>}/>
                    <Input
                        variant={"filled"} 
                        placeholder="아이디"/>
                </InputGroup>
                <InputGroup mt={2}> 
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaLock/>
                        </Box>
                    }/>
                    <Input 
                        type="password" 
                        variant={"filled"} 
                        placeholder="비밀번호"/>
                </InputGroup>
                <Button type="submit" marginY={4} colorScheme="red" width={"100%"}>로그인</Button>
                <Grid mb={4} w={"100%"} templateColumns={"repeat(3, 1fr)"}>        
                    <Button as={"a"} href="/user/signup" rounded={0} variant={"ghost"} borderRightWidth={1}>회원가입</Button>
                    <Button rounded={0} variant={"ghost"} borderRightWidth={1}>아이디찾기</Button>
                    <Button rounded={0} variant={"ghost"}>비밀번호찾기</Button>
                </Grid>
            </VStack>
            <SocialLogIn/>
        </VStack>
    )
}