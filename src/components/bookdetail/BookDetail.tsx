import { VStack, HStack, Image, Heading, Text, Button, IconButton, useToast, Input, Box, Select } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { addCartApi, bookDetailApi, reviewListApi} from "../../api";
import Trade from "./Trade";
import ReviewItem from "./ReviewItem";
import ReviewInput from "./ReviewInput";

// 서버로부터 가져올 책 데이터 형식 지정
interface IBookDetailForm {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_rating: number;
    book_review_count: number;
    book_price: number;
    book_author_name: string;
    book_publisher: string;
    book_interpreter: string;
    book_intro: string;
    book_contents: string;
    book_author_intro: string;
    book_ebook_path: string;
}

// 장바구니에 추가할 책 isbn 형식 지정
interface IAddCart {
    book_isbn: string
}

// 서버로부터 가져올 리뷰 데이터 형식 지정
interface IReviewForm {
    review_user_email: string
    review_rating: number
    review_content: string
}

// 책 상세 페이지 컴포넌트
export default function BookDetail() {
    // 책 isbn 파라미터에서 추출
    const {bookId} = useParams();
    // 책 데이터 호출
    const bookDetailQuery = useQuery<IBookDetailForm>({queryKey: ['getBookDetail', bookId], queryFn: bookDetailApi})
    const book = bookDetailQuery.data;

    // 리뷰 데이터 호출
    const reviewListQuery = useQuery<IReviewForm[]>({queryKey:["getReviewList", bookId], queryFn: reviewListApi})

    const toast = useToast();
    // 장바구니 추가 처리
    const mutation = useMutation({mutationFn: addCartApi,
        onSuccess: (data) => {
            // 실패 시 오류 메시지 출력
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            // 성공 시 성공 메시지 출력
            if (data.ok) {
                toast({
                    title: `${data.ok}`,
                    status: "success"
                })
            }
        }
    });

    // 장바구니 추가 버튼 클릭 리스너
    const onClick = () => {
        const book_isbn = bookId;
        mutation.mutate(book_isbn as any);
    }

    return(
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                {/* 책 상단 정보 */}
                <HStack my={5} w={"100%"}>
                    <Image border='1px' maxW={"40%"} objectFit={"cover"} src={book?.book_cover_path}/>
                    <VStack ml={3} w={"60%"} alignItems={"flex-start"}>
                        <Heading fontSize={"xx-large"}>{book?.book_name}</Heading>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>{book?.book_rating} ({book?.book_review_count})</Text>
                        </HStack>
                        <HStack>
                            <Text>{book?.book_author_name} 저</Text>
                            <Text>|</Text>
                            <Text>{book?.book_interpreter} 역</Text>
                            <Text>|</Text>
                            <Text>{book?.book_publisher} 출판</Text>
                        </HStack>
                        <VStack w={"100%"} mt={2} pt={2} alignItems={"flex-start"} borderTopWidth={1}>
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                    <Text>전자책 정가</Text>
                                    <Text color={"blue"}>{book?.book_price}원</Text>
                            </HStack>
                        </VStack>
                        <HStack mt={5} w={"100%"} justifyContent={"flex-end"}>
                            <IconButton aria-label="like" icon={<FaRegHeart/>} />
                            <Button onClick={onClick}>장바구니 담기</Button>
                            <Button colorScheme="blue">바로 구매</Button>
                        </HStack>
                        {/* 거래 관련 정보 */}
                        <HStack w={"100%"}>
                            <Trade bookId = {bookId? bookId: ""}/>
                        </HStack>
                    </VStack>
                </HStack>
                {/* 도서 소개, 저자 소개, 목차 */}
                <VStack w={"100%"}>
                    <HStack w={"100%"} alignItems={"flex-start"} borderBottomWidth={1}>
                        <Heading mb={2}>도서 소개</Heading>
                    </HStack>
                    <Text>
                          {book?.book_intro}
                    </Text>
                </VStack>
                <VStack w={"100%"} mt={10}>
                    <HStack w={"100%"} alignItems={"flex-start"} borderBottomWidth={1}>
                        <Heading mb={2}>저자 소개</Heading>
                    </HStack>
                    <Text>
                        {book?.book_author_intro}
                    </Text>
                </VStack>
                <VStack w={"100%"} mt={10}>
                    <HStack w={"100%"} alignItems={"flex-start"} borderBottomWidth={1}>
                        <Heading mb={2}>목차</Heading>
                    </HStack>
                    <Text>
                        {book?.book_contents}
                    </Text>
                </VStack>
                {/* 리뷰 */}
                <VStack w={"100%"} mt={10}>
                    <HStack w={"100%"} alignItems={"flex-start"} borderBottomWidth={1}>
                        <Heading mb={2}>리뷰({book?.book_review_count})</Heading>
                    </HStack>
                    {/* 리뷰 작성란 */}
                    <ReviewInput bookId = {bookId? bookId: ""}/>     
                    {/* 리뷰 아이템 */}
                    {reviewListQuery.data?.map((review) => 
                        <ReviewItem
                            email = {review.review_user_email}
                            rating={review.review_rating}
                            content={review.review_content}  />
                    )}                            
                </VStack>
            </VStack>
        </VStack>
    )
}