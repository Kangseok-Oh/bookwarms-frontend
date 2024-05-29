import { HStack, VStack, Text, Input, Button, Image } from "@chakra-ui/react";
import PaymentItem from "../payment/PaymentItem";

export default function BookTrade() {
    return(
        <VStack w={"100%"}>
            <VStack w={"70%"} alignItems={"flex-start"} as={'form'}>
                <HStack w={"100%"} alignItems={"flex-start"} mx={5} borderBottomWidth={1}>
                    <Text fontSize={"xx-large"}>
                        판매 입찰
                    </Text>
                </HStack>
                <HStack mt={1} w={"100%"} justifyContent={"space-between"}>
                    <HStack>
                        <HStack maxH={200} overflow={"hidden"}>
                            <Image border={"1px"} objectFit={"cover"} maxH={200} src={"https://img.ridicdn.net/cover/1691000080/xxlarge#1"}/>
                            <VStack ml={3} alignItems={"flex-start"}>
                                <Text fontSize={"large"}>돈의 속성</Text>
                                <Text fontSize={"small"} mt={-2} color={"gray.500"}>김승호</Text>
                            </VStack>
                        </HStack>
                    </HStack>
                    <HStack>
                        <Text mr={2}>입찰 가격</Text>
                        <Input w={"50%"} variant={"filled"}></Input>
                        <Text>원</Text>
                    </HStack>
                </HStack>
                <HStack w={"100%"} justifyContent={"flex-end"}>
                    <Button type="submit" colorScheme="red">입찰 등록</Button>
                </HStack>
            </VStack>
        </VStack>
    );
}