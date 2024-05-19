import { HStack, VStack, Image, Text, IconButton } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

interface IPaymentItem {
    coverPath: string;
    bookName: string;
    authorName: string;
    bookPrice: number;
}

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