import { HStack, VStack, Text, Button, Grid, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { categoryApi, categoryBookListApi } from "../../api";
import BookItem from "./BookItem";

interface IBookList {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_rating: number;
    book_review_count: number;
    book_price: number;
    book_author_name: string;
}

interface ICategory {
    category_id: string;
    category_big_name: string;
    category_sml_name: string;
}

export default function BookList() {
    const {categoryId} = useParams();
    const categoryBookListQuery = useQuery<IBookList[]>({queryKey: ['getCategoryBookList', categoryId], queryFn: categoryBookListApi});
    const categoryNameQuery = useQuery<ICategory>({queryKey: ['getCategoryName', categoryId], queryFn: categoryApi})
    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
                        {categoryNameQuery.data?.category_sml_name}
                    </Text>
                </HStack>
                <HStack w={"100%"} alignItems={"flex-start"}>
                    <Button variant={"ghost"} fontSize={"small"}>주간 베스트</Button>
                    <Button variant={"ghost"} fontSize={"small"}>월간 베스트</Button>
                    <Button variant={"ghost"} fontSize={"small"}>스테디 셀러</Button>
                </HStack>
                <Grid templateColumns={"repeat(6, 1fr)"} columnGap={4}>
                    {/* 예시 데이터 */}
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
                    {categoryBookListQuery.data?.map((book) => <BookItem
                        bookReviewCount={book.book_review_count}
                        bookIsbn={book.book_isbn}
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

