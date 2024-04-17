import { HStack, VStack, Text, Grid,Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Bookshelf() {
    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
                        내 서재
                    </Text>
                </HStack>
                <Grid templateColumns={"repeat(6, 1fr)"} columnGap={4}>
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