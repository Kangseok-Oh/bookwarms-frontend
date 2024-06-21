import { HStack, VStack, Text, Button, useToast} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { orderApi, orderItemApi } from "../../api";
import PaymentItem from "./PaymentItem";
import { useEffect } from "react";

// 결제할 책 데이터 형식 지정
interface IOrderList {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_price: number;
    book_author_name: string;
}

// 결제 화면 컴포넌트
export default function Payment() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    // 결제할 책 데이터 호출
    const mutation = useMutation({mutationFn: orderItemApi})

    // 결제 처리
    const mutation2 = useMutation({mutationFn: orderApi,
        onSuccess: (data) => {
            // 실패 시 오류 메시지 출력
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            // 성공 시 결제 성공 페이지 이동
            if (data.ok) {
                navigate("/payment/ok")
            }
        },
    })

    // 결제하기 버튼 클릭 리스너
    const onClick = () => {
        const total_price = getTotalPrice()
        mutation2.mutate(state)
    }

    // 화면 출력될 때 딱 1번 결제할 책 목록 가져오기
    useEffect(() => {
        if (state) {
            mutation.mutate(state)
        }
    }, [])

    // 결제 총 금액 계산
    const getTotalPrice = () => {
        let total = 0;
        mutation.data?.map((book: IOrderList) => total = total + book.book_price);
        return total;
    }

    return (
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mx={5} borderBottomWidth={1}>
                    <Text fontSize={"xx-large"}>
                        결제
                    </Text>
                </HStack>
                {/* 결제할 책 목록 */}
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