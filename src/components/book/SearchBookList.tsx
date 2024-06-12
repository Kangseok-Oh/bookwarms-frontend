import { HStack, VStack, Text, Button, Grid,Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { searchBookListApi } from "../../api";
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

export default function SearchBookList() {
    const {keyWord} = useParams();
    const searchListQuery = useQuery<IBookList[]>({queryKey: ["getSearchList", keyWord], queryFn: searchBookListApi});

    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
    
                    </Text>
                </HStack>
                <HStack w={"100%"} alignItems={"flex-start"}>
                    <Button variant={"ghost"} fontSize={"small"}>주간 베스트</Button>
                    <Button variant={"ghost"} fontSize={"small"}>월간 베스트</Button>
                    <Button variant={"ghost"} fontSize={"small"}>스테디 셀러</Button>
                </HStack>
                {searchListQuery.data ?    
                    <Grid templateColumns={"repeat(6, 1fr)"} columnGap={4}>
                        {searchListQuery.data?.map((book) => <BookItem
                            bookReviewCount={book.book_review_count}
                            bookIsbn={book.book_isbn}
                            bookCoverUrl={book.book_cover_path}
                            bookName={book.book_name}
                            bookRating={book.book_rating}
                            bookPrice={book.book_price}
                            bookAuthorName={book.book_author_name}
                    />)}
                    </Grid>
                    : <VStack justifyContent={"center"} minH={"100vh"}>
                        <Text>찾으시는 책이 없네요. ㅠㅠ</Text>
                        <Link to="/">
                            <Button colorScheme={"red"} variant={"link"}>홈 화면으로 돌아가기&rarr;</Button>
                        </Link>
                    </VStack>
                }
                
            </VStack>
        </VStack>
    )
}