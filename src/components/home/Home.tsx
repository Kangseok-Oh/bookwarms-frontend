import { Box, VStack, Image, IconButton, Text, Grid, HStack, useDisclosure} from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import HomeCategory from "./HomeCategory";


export default function Home() {
    return (
        <VStack alignItems={"center"} borderBottomWidth={1}>
            <VStack w={"70%"}>
                <HomeCategory/>
                <Box position={"relative"} maxH={"500"} overflow={"hidden"}>
                    <Image minH={"500"}  objectFit={"cover"} src="https://active.ridibooks.com/ridibooks_banner/1711679450927_MjQwMjI3.jpg"></Image>
                    <IconButton variant={"ghost"} position={"absolute"} top={"50%"} left={3} aria-label="previous event" icon={<IoIosArrowBack color="white"/>}/>
                    <IconButton variant={"ghost"} position={"absolute"} top={"50%"} right={3} aria-label="next event" icon={<IoIosArrowForward color="white"/>}/>
                    <Text color={"white"} position={"absolute"} bottom={10} left={20} fontSize={'xx-large'}>4월은 최대 40% 할인!</Text>
                </Box>
                <Grid minH={250} w={"100%"} mt={5} templateColumns={"repeat(4, 1fr)"} columnGap={6}>
                    {/* 나중에 컴포넌트로 대체 */}
                    <VStack as={"a"} href="/book" rounded={"xl"} backgroundColor={"purple"}>
                        <Text mt={"125"}>베스트셀러</Text>
                    </VStack>
                    <VStack rounded={"xl"} backgroundColor={"green"}>
                        <Text mt={"125"}>신 간</Text>
                    </VStack>
                    <VStack rounded={"xl"} backgroundColor={"yellow"}>
                        <Text mt={"125"}>할인 중</Text>
                    </VStack>
                    <VStack rounded={"xl"} backgroundColor={"orange"}>
                        <Text mt={"125"}>에디터 추천</Text>
                    </VStack>
                </Grid>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
                        지금 사람들이 많이 읽는 책!
                    </Text>
                </HStack>
                <Grid w={"100%"} mt={3} templateColumns={"repeat(6, 1fr)"} columnGap={6} mb={10}>
                    {/* 나중에 컴포넌트로 api 받아오게 대체 */}
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                    </VStack>
                    <VStack alignItems={"flex-start"}>
                        <Image border='1px' maxW={"100%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1" />
                        <Text mb={-1} fontSize={"large"}>불변의 법칙</Text>
                        <Text color={"gray.400"} fontSize={"small"}>모건 하우절</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0</Text>
                        </HStack>
                    </VStack>
                </Grid>
            </VStack>
        </VStack>
    );
}