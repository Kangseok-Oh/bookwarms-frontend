import { HStack, VStack, Text, Button, Grid, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { categoryApi, categoryBookListApi } from "../../api";
import BookItem from "./BookItem";

// 받아올 책 데이터 형식 지정
interface IBookList {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_rating: number;
    book_review_count: number;
    book_price: number;
    book_author_name: string;
}

// 받아올 카테고리 데이터 형식 지정
interface ICategory {
    category_id: string;
    category_big_name: string;
    category_sml_name: string;
}

// 카테고리 별 책 리스트 컴포넌트
export default function BookList() {
    // 파라미터에서 카테고리 추출
    const {categoryId} = useParams();

    // 카테고리에 해당하는 책 데이터 목록 호출
    const categoryBookListQuery = useQuery<IBookList[]>({queryKey: ['getCategoryBookList', categoryId], queryFn: categoryBookListApi});

    // 카테고리 데이터 호출
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
                    {/* 책 리스트 */}
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

