import { HStack, VStack, Image, Text, IconButton } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

// 책 데이터 형식 지정
interface IPaymentItem {
    coverPath: string;
    bookName: string;
    authorName: string;
    bookPrice: number;
}

// 결제창 책 목록 아이템 컴포넌트
export default function PaymentItem({coverPath, bookName, authorName, bookPrice}: IPaymentItem) {
    return (
        <HStack mt={1} w={"100%"} justifyContent={"space-between"}>
            <HStack>
                <HStack maxH={200} overflow={"hidden"}>
                    <Image border={"1px"} objectFit={"cover"} maxH={200} src={coverPath}/>
                    <VStack ml={3} alignItems={"flex-start"}>
                        <Text fontSize={"large"}>{bookName}</Text>
                        <Text fontSize={"small"} mt={-2} color={"gray.500"}>{authorName}</Text>
                    </VStack>
                </HStack>
            </HStack>
            <HStack>
                <Text>{bookPrice}원</Text>
            </HStack>
        </HStack>
    );
}