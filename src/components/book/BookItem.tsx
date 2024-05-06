import { VStack, Image, Text, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface IBookItemProps {
    bookCoverUrl: string
    bookName: string
    bookRating: number
    bookPrice: number
    bookAuthorName: string
}

export default function BookItem({bookCoverUrl, bookName, bookRating, bookPrice, bookAuthorName}: IBookItemProps) {
    return (
        <VStack as={"a"} href="/book/1" alignItems={"flex-start"}>
            <Image border='1px' maxW={"100%"} objectFit={"cover"} src={bookCoverUrl} />
            <Text mb={-1} fontSize={"large"}>{bookName}</Text>
            <Text color={"gray.400"} fontSize={"small"}>{bookAuthorName}</Text>
            <HStack color={"red"}>
                <FaStar/>
                <Text fontSize={"small"}>{bookRating}</Text>
            </HStack>
            <Text mb={-2} color={"blue"}>소장 {bookPrice}</Text>
            <Text color={"red"}>거래 17,500원</Text>
        </VStack>
    )
}