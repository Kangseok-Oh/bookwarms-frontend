import { VStack, HStack, Text, Checkbox, Button, IconButton, Image, Box } from "@chakra-ui/react";
import { IoIosClose, IoMdClose } from "react-icons/io";


export default function Cart() {
    return(
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
                        장바구니
                    </Text>
                </HStack>
                <HStack w={"100%"} py={2} justifyContent={"space-between"} borderBottomWidth={1}>
                    <Checkbox>전체</Checkbox>
                    <Button variant={"ghost"} color={"red"}>삭제</Button>
                </HStack>
                <HStack mt={1} w={"100%"} justifyContent={"space-between"}>
                    <HStack>
                        <Checkbox mr={5}/>
                        <HStack maxH={200} overflow={"hidden"}>
                                <Image border={"1px"} objectFit={"cover"} maxH={200} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1"/>
                                <VStack ml={3}>
                                    <Text fontSize={"large"}>불변의 법칙</Text>
                                    <Text mt={-2} color={"gray.500"}>모건 하우절</Text>
                                </VStack>
                        </HStack>
                    </HStack>
                    <HStack>
                        <Text>23,000원</Text>
                        <IconButton aria-label="delete items" variant={"ghost"} icon={<IoMdClose/>}/>
                    </HStack>
                </HStack>
                <HStack w={"100%"} borderTopWidth={1} justifyContent={"flex-end"}>
                    <VStack>
                        <Text mt={2}>총 23,000원</Text>
                        <Button mt={2} w={100} colorScheme={"red"}>결제하기</Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}