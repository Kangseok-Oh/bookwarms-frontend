import { HStack, VStack, Text, Grid,Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { bookShelfApi } from "../../api";
import BookshelfItem from "./BookshelfItem";

interface IBookshelfBook{
    bookshelf_book_isbn: IBook
}

interface IBook {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_rating: number;
    book_author_name: string;
}

export default function Bookshelf() {
    const bookshelfListQuery = useQuery<IBookshelfBook[]>({queryKey: ['getBookshelfList'], queryFn: bookShelfApi})
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
                    {bookshelfListQuery.data?.map((book) => <BookshelfItem
                        book_isbn={book.bookshelf_book_isbn.book_isbn}
                        book_cover_path={book.bookshelf_book_isbn.book_cover_path}
                        book_author_name={book.bookshelf_book_isbn.book_author_name}
                        book_name={book.bookshelf_book_isbn.book_name}
                        book_rating={book.bookshelf_book_isbn.book_rating}/>
                    )}
                </Grid>
            </VStack>
        </VStack>
    );
}