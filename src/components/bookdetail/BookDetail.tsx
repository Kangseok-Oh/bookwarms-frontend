import { VStack, HStack, Image, Heading, Text, Button, IconButton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { bookDetailApi } from "../../api";

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
}

export default function BookDetail() {
    const {bookId} = useParams();
    const bookDetailQuery = useQuery<IBookDetailForm>({queryKey: ['getBookDetail', bookId], queryFn: bookDetailApi})
    const book = bookDetailQuery.data;
    return(
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack my={5} w={"100%"}>
                    <Image border='1px' maxW={"25%"} objectFit={"cover"} src={book?.book_cover_path}/>
                    <VStack ml={3} w={"75%"} alignItems={"flex-start"}>
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
                        <VStack w={"100%"} mt={2} alignItems={"flex-start"} borderTopWidth={1}>
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                    <Text>전자책 정가</Text>
                                    <Text color={"blue"}>{book?.book_price}원</Text>
                            </HStack>
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                <Text>즉시 거래가</Text>
                                <Text color={"red"}>17,500원</Text>
                            </HStack>
                        </VStack>
                        <HStack w={"100%"} justifyContent={"flex-end"}>
                            <IconButton aria-label="like" icon={<FaRegHeart/>} />
                            <Button>장바구니 담기</Button>
                            <Button colorScheme="blue">바로 구매</Button>
                        </HStack>
                    </VStack>
                </HStack>
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
            </VStack>
        </VStack>
    )
}