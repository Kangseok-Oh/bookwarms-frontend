import { HStack, VStack, Text, Checkbox, Button, Image, IconButton } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

export default function Payment() {
    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mx={5} borderBottomWidth={1}>
                    <Text fontSize={"xx-large"}>
                        결제
                    </Text>
                </HStack>
                <HStack mt={1} w={"100%"} justifyContent={"space-between"}>
                    <HStack>
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
                        <Text color={"red"} mt={2}>정가 23,000원</Text>
                        <Text mt={-1} color={"blue"}>할인액 2,000원</Text>
                        <Text>결제가 21,000원</Text>
                        <Button as={"a"} href="/payment/ok" mt={2} w={100} colorScheme={"red"}>결제하기</Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}