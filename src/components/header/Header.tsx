import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { FaBook, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <VStack alignItems={"center"}>
            <HStack width={"70%"} justifyContent={"flex-end"}>
                <Box>
                    <Button fontSize={"small"} variant={"ghost"}>고객센터</Button>
                    <Link to={"/user/signup"}>
                        <Button fontSize={"small"} variant={"ghost"}>회원가입</Button>
                    </Link>        
                    <Link to={"/user/login"}>
                        <Button fontSize={"small"} variant={"ghost"}>로그인</Button>
                    </Link>

                </Box>
            </HStack>
            <HStack width={"70%"} mt={2} pb={6} justifyContent={"space-between"} borderBottomWidth={1}>
                <Box>
                    <Link to={"/"}>
                        <Text as={"b"} fontSize={"3xl"}>BookWarms</Text>
                    </Link>
                </Box>
                <HStack>
                    <InputGroup minW={300} mr={10}>
                        <InputLeftElement pointerEvents={"none"}>
                            <FaSearch color="gray"/>
                        </InputLeftElement>
                        <Input variant={'filled'} size='lg' placeholder="검색" />
                    </InputGroup>
                    <HStack spacing={10}>
                        <IconButton as={"a"} href="/user/bookshelf" variant={"ghost"} aria-label="to go bookshelf" icon={<FaBook size={'lg'}/>}/>
                        <IconButton as={"a"} href="/user/cart" variant={"ghost"} aria-label="to go bookcart" icon={<FaShoppingCart size={'lg'}/>}/>
                        <IconButton variant={"ghost"} aria-label="to go mypage" icon={<FaUser size={'lg'}/>}/>
                    </HStack>
                </HStack>
            </HStack>
        </VStack>
    );
}