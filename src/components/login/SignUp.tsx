import { Box, Button, Input, InputGroup, InputLeftElement, VStack, Text, Select } from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import SocialLogIn from "./SocialLogIn";

export default function SignUp() {
    return(
        <VStack mt={"10%"}>
            <VStack w={"25%"} borderBottomWidth={1}>
                <Text as={"b"} fontSize={"3xl"} mb={3}>BookWarms</Text>
                <InputGroup>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaUser/>
                        </Box>
                    }/>
                    <Input variant={"filled"} placeholder="아이디"/>
                </InputGroup>
                <InputGroup mt={2}>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaLock/>
                        </Box>
                    }/>
                    <Input type="password" variant={"filled"} placeholder="비밀번호"/>
                </InputGroup>
                <InputGroup mt={2}>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaUserTag/>
                        </Box>
                    }/>
                    <Input variant={"filled"} placeholder="이름"/>
                </InputGroup>
                <Select placeholder="성별" mt={2}>
                    <option value={"남성"}>남성</option>
                    <option value={"여성"}>여성</option>
                </Select>
                <InputGroup mt={2}>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaEnvelope/>
                        </Box>
                    }/>
                    <Input variant={"filled"} placeholder="이메일"/>
                </InputGroup>
                <Button marginTop={4} colorScheme="red" width={"100%"} mb={4}>가입하기</Button>
            </VStack>
            <SocialLogIn/>
        </VStack>
    );
}