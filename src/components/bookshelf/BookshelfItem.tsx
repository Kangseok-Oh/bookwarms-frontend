import { VStack, HStack, Text, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface IBookItem {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_author_name: string;
    book_rating: number;
}

export default function BookshelfItem({book_isbn, book_cover_path, book_name, book_author_name, book_rating}: IBookItem) {
    return (
        <VStack as={"a"} alignItems={"flex-start"} href={`/epub/${book_isbn}`}>
            <Image border='1px' maxW={"100%"} objectFit={"cover"} src={book_cover_path} />
            <Text mb={-1} fontSize={"large"}>{book_name}</Text>
            <Text color={"gray.400"} fontSize={"small"}>{book_author_name}</Text>
            <HStack color={"red"}>
                <FaStar/>
                <Text fontSize={"small"}>{book_rating}</Text>
            </HStack>
        </VStack>
    );
}