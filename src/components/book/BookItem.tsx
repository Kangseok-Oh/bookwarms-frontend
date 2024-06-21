import { VStack, Image, Text, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

// 책 데이터 형식 지정
interface IBookItemProps {
    bookIsbn: string;
    bookCoverUrl: string;
    bookName: string;
    bookRating: number;
    bookReviewCount: number;
    bookPrice: number;
    bookAuthorName: string;
}

// 책 리스트용 책 아이템 컴포넌트
export default function BookItem({bookIsbn, bookCoverUrl, bookName, bookRating, bookReviewCount, bookPrice, bookAuthorName}: IBookItemProps) {
    return (
        // 누르면 상세 페이지 이동
        <VStack as={"a"} href={`/book/${bookIsbn}`} alignItems={"flex-start"}>
            <Image border='1px' maxW={"100%"} objectFit={"cover"} src={bookCoverUrl} />
            <Text mb={-1} fontSize={"large"}>{bookName}</Text>
            <Text color={"gray.400"} fontSize={"small"}>{bookAuthorName}</Text>
            <HStack color={"red"}>
                <FaStar/>
                <Text fontSize={"small"}>{bookRating}({bookReviewCount})</Text>
            </HStack>
            <Text mb={-2} color={"blue"}>소장 {bookPrice}원</Text>
            <Text color={"red"}>거래 17,500원</Text>
        </VStack>
    )
}