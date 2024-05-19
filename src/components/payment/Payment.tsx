import { HStack, VStack, Text, Button, useToast} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { orderApi, orderItemApi } from "../../api";
import PaymentItem from "./PaymentItem";
import { useEffect } from "react";

interface IOrderList {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_price: number;
    book_author_name: string;
}
export default function Payment() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const mutation = useMutation({mutationFn: orderItemApi})
    const mutation2 = useMutation({mutationFn: orderApi,
        onSuccess: (data) => {
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            if (data.ok) {
                navigate("/payment/ok")
            }
        },
    })
    useEffect(() => {
        if (state) {
            mutation.mutate(state)
        }
    }, [])

    const getTotalPrice = () => {
        let total = 0;
        mutation.data?.map((book: IOrderList) => total = total + book.book_price);
        return total;
    }

    const onClick = () => {
        const total_price = getTotalPrice()
        mutation2.mutate(state)
    }
    
    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mx={5} borderBottomWidth={1}>
                    <Text fontSize={"xx-large"}>
                        결제
                    </Text>
                </HStack>
                {mutation.data?.map((book: IOrderList) => <PaymentItem
                    bookName={book.book_name}
                    coverPath={book.book_cover_path}
                    bookPrice={book.book_price}
                    authorName={book.book_author_name}/>
                )}
                <HStack w={"100%"} borderTopWidth={1} justifyContent={"flex-end"}>
                    <VStack>
                        <Text color={"red"} mt={2}>정가 {getTotalPrice()}원</Text>
                        <Text mt={-1} color={"blue"}>할인액 0원</Text>
                        <Text>결제가 {getTotalPrice()}원</Text>
                        <Button onClick={onClick} mt={2} w={100} colorScheme={"red"}>결제하기</Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}