import { HStack, VStack, Text, Button, Grid, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { categoryBookListApi } from "../../api";
import BookItem from "./BookItem";

interface IBookList 
 {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_rating: number;
    book_price: number;
    book_author_name: string;
}

export default function BookList() {
    const {categoryId} = useParams();
    const {isLoading, data} = useQuery<IBookList[]>({queryKey: ['getCategoryBookList', categoryId], queryFn: categoryBookListApi})
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
                    {data?.map((book) => <BookItem
                        bookCoverUrl={book.book_cover_path}
                        bookName={book.book_name}
                        bookRating={book.book_rating}
                        bookPrice={book.book_price}
                        bookAuthorName={book.book_author_name}
                    />)}
                </Grid>
            </VStack>
        </VStack>
    );

}

