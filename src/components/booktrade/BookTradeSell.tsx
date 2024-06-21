import { HStack, VStack, Text, Input, Button, Image, Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { immediatePurPriceApi, immediateSellApi, sellApi, tradeBookApi } from "../../api";
import { useForm } from "react-hook-form";

// 입찰할 책 데이터 형식 지정
interface ITradeBook {
    book_isbn: string
    book_cover_path: string
    book_name: string
    book_price: number
    book_author_name: string
}

// 즉시 판매가 데이터 형식 지정
interface IImmediatePurPrice {
    purchase_price: number
}

// 서버로 보낼 입찰가 데이터 형식 지정
interface IForm {
    sell_price: number;
}

// 판매 입찰 페이지 컴포넌트
export default function BookTradeSell() {
    const toast = useToast();
    // 책 코드 파라미터에서 추출
    const {bookId} = useParams();

    // 책 코드에 해당하는 책 데이터 호출
    const tradeBookQuery = useQuery<ITradeBook>({queryKey: ["getTradeBook", bookId], queryFn: tradeBookApi})
    const book = tradeBookQuery.data

    // 해당 책의 현재 즉시 판매가 데이터 호출
    const immediatePurPriceQuery = useQuery<IImmediatePurPrice>({queryKey: ["getImmediatePurPrice", bookId], queryFn: immediatePurPriceApi})

    const {register, handleSubmit, formState:{errors}} = useForm<IForm>();
    // 입찰가 등록 처리
    const sellMutation = useMutation({mutationFn: sellApi,
        onSuccess: (data) => {
            // 실패시 오류 메시지 출력
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
    })

    // 즉시 판매 처리
    const immediateSellMutation = useMutation({mutationFn: immediateSellApi,
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
    })

    // 판매 입찰 폼 submit 리스너
    const onSell = ({sell_price}: IForm) => {
        if (bookId) {
            const sell_book_isbn = bookId
            sellMutation.mutate({sell_price, sell_book_isbn})
        } 
    }

    // 즉시 판매 폼 submit 리스너
    const onImmediateSell = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (bookId && immediatePurPriceQuery.data?.purchase_price) {
            const trade_book_isbn = bookId
            const trade_price = immediatePurPriceQuery.data?.purchase_price
            immediateSellMutation.mutate({trade_price, trade_book_isbn})
        }
    }

    return(
        <VStack w={"100%"}>
            <VStack w={"70%"} alignItems={"flex-start"}>
                <HStack w={"100%"} alignItems={"flex-start"} mx={5} borderBottomWidth={1}>
                    <Text fontSize={"xx-large"}>
                        판매 입찰
                    </Text>
                </HStack>
                {/* 책 정보 */}
                <HStack mt={1} w={"100%"} justifyContent={"space-between"}>
                    <HStack>
                        <HStack maxH={200} overflow={"hidden"}>
                            <Image border={"1px"} objectFit={"cover"} maxH={200} src={book?.book_cover_path}/>
                            <VStack ml={3} alignItems={"flex-start"}>
                                <Text fontSize={"large"}>{book?.book_name}</Text>
                                <Text fontSize={"small"} mt={-2} color={"gray.500"}>{book?.book_author_name}</Text>
                            </VStack>
                        </HStack>
                    </HStack>
                </HStack>
                <Tabs mt={3} isFitted variant='enclosed' w={"100%"}>
                    <TabList mb='1em'>
                        <Tab>판매 입찰</Tab>
                        <Tab>즉시 판매</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel as={"form"} onSubmit={handleSubmit(onSell)}>
                            <VStack w={"100%"} justifyContent={"flex-end"} >
                                <HStack w={"100%"} justifyContent={"flex-end"}>
                                    <Text mr={2}>입찰 가격</Text>
                                    <Input {...register("sell_price",  {required: "가격을 입력하세요"})} w={"30%"} variant={"filled"}/>
                                    <Text>원</Text>
                                </HStack>
                                <HStack mt={3} w={"100%"} justifyContent={"flex-end"}>
                                    <Button type="submit" colorScheme="red">입찰 등록</Button>
                                </HStack>
                            </VStack>
                        </TabPanel>
                        <TabPanel as={"form"} onSubmit={onImmediateSell}>
                            <VStack w={"100%"} justifyContent={"flex-end"}>
                                <HStack w={"100%"} justifyContent={"flex-end"}>
                                    <Text mr={2}>바로 판매 가격</Text>
                                    <Text as='b'>{immediatePurPriceQuery.data?.purchase_price}</Text>
                                    <Text>원</Text>
                                </HStack>
                                <HStack mt={3} w={"100%"} justifyContent={"flex-end"}>
                                    <Button type="submit" colorScheme="red">바로 판매</Button>
                                </HStack>
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </VStack>
    );
}