import { Button, Grid, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

// 프로토타입 책 리스트 컴포넌트(사용X)
export default function BookList() {
    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
                        베스트셀러
                    </Text>
                </HStack>
                <HStack w={"100%"} alignItems={"flex-start"}>
                    <Button variant={"ghost"} fontSize={"small"}>주간 베스트</Button>
                    <Button variant={"ghost"} fontSize={"small"}>월간 베스트</Button>
                    <Button variant={"ghost"} fontSize={"small"}>스테디 셀러</Button>
                </HStack>
                <Grid templateColumns={"repeat(6, 1fr)"} columnGap={4}>
                    {/* 나중에 api 완성되면 컴포넌트 만들어서 대체 */}
                    <VStack as={"a"} href="/book/1" alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                        <Text mb={-2} color={"blue"}>소장 23,000원</Text>
                        <Text color={"red"}>거래 17,500원</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                        <Text mb={-2} color={"blue"}>소장 23,000원</Text>
                        <Text color={"red"}>거래 17,500원</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                        <Text mb={-2} color={"blue"}>소장 23,000원</Text>
                        <Text color={"red"}>거래 17,500원</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                        <Text mb={-2} color={"blue"}>소장 23,000원</Text>
                        <Text color={"red"}>거래 17,500원</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                        <Text mb={-2} color={"blue"}>소장 23,000원</Text>
                        <Text color={"red"}>거래 17,500원</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                        <Text mb={-2} color={"blue"}>소장 23,000원</Text>
                        <Text color={"red"}>거래 17,500원</Text>
                    </VStack>
                </Grid>
            </VStack>
        </VStack>
    );

}