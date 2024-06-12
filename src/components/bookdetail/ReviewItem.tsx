import { VStack, HStack, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface IReview {
    email: string
    rating: number
    content: string
}

export default function ReviewItem({email, rating, content}: IReview) {
    return (
        <VStack ml={5} pb={5} w={"100%"} borderBottomWidth={0.5}>
            <HStack w={"100%"} justifyContent={"flex-start"}>
                <Text>{email} | </Text>
                <FaStar color="red"/>
                <Text fontSize={"small"}>{rating}</Text>
            </HStack>
            <Text w={"90%"}>{content}</Text>
        </VStack>
    );
}