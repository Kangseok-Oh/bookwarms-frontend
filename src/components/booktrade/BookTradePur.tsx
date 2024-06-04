import { HStack, VStack, Text, Input, Button, Image, TabPanel, TabPanels, TabList, Tab, Tabs, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { immediatePurApi, immediateSellPriceApi, purchaseApi, tradeBookApi } from "../../api";
import { useForm } from "react-hook-form";

interface ITradeBook {
    book_isbn: string
    book_cover_path: string
    book_name: string
    book_price: number
    book_author_name: string
}

interface IImmediateSellPrice {
    sell_price: number
}

interface IForm {
    purchase_price: number;
}

export default function BookTradePur() {
    const toast = useToast();
    const {bookId} = useParams();
    const tradeBookQuery = useQuery<ITradeBook>({queryKey: ["getTradeBook", bookId], queryFn: tradeBookApi})
    const book = tradeBookQuery.data

    const immediateSellPriceQuery = useQuery<IImmediateSellPrice>({queryKey: ["getImmediateSellPrice", bookId], queryFn: immediateSellPriceApi})

    const {register, handleSubmit, formState:{errors}} = useForm<IForm>();

    const purMutation = useMutation({mutationFn: purchaseApi,
        onSuccess: (data) => {
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            if (data.ok) {
                toast({
                    title: `${data.ok}`,
                    status: "success"
                })
            }
        }
    })

    const immediatePurMutation = useMutation({mutationFn: immediatePurApi,
        onSuccess: (data) => {
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            if (data.ok) {
                toast({
                    title: `${data.ok}`,
                    status: "success"
                })
            }
        }
    })

    const onPur = ({purchase_price}:IForm) => {
        if (bookId) {
            const purchase_book_isbn = bookId
            purMutation.mutate({purchase_price, purchase_book_isbn})
        } 
    }

    const onImmediatePur = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (bookId && immediateSellPriceQuery.data?.sell_price) {
            const trade_book_isbn = bookId
            const trade_price = immediateSellPriceQuery.data?.sell_price
            immediatePurMutation.mutate({trade_price, trade_book_isbn})
        }
    }

    return(
        <VStack w={"100%"}>
            <VStack w={"70%"} alignItems={"flex-start"} >
                <HStack w={"100%"} alignItems={"flex-start"} mx={5} borderBottomWidth={1}>
                    <Text fontSize={"xx-large"}>
                        구매 입찰
                    </Text>
                </HStack>
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
                        <Tab>구매 입찰</Tab>
                        <Tab>즉시 구매</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel as={'form'} onSubmit={handleSubmit(onPur)}>
                            <VStack w={"100%"} justifyContent={"flex-end"}>
                                <HStack w={"100%"} justifyContent={"flex-end"}>
                                    <Text mr={2}>입찰 가격</Text>
                                    <Input {...register("purchase_price",  {required: "가격을 입력하세요"})} w={"30%"} variant={"filled"}></Input>
                                    <Text>원</Text>
                                </HStack>
                                <HStack mt={3} w={"100%"} justifyContent={"flex-end"}>
                                    <Button type="submit" colorScheme="red">입찰 등록</Button>
                                </HStack>
                            </VStack>
                        </TabPanel>
                        <TabPanel as={'form'} onSubmit={onImmediatePur}>
                            <VStack w={"100%"} justifyContent={"flex-end"}>
                                <HStack w={"100%"} justifyContent={"flex-end"}>
                                    <Text mr={2}>바로 구매 가격</Text>
                                    <Text as='b'>{immediateSellPriceQuery.data?.sell_price}</Text>
                                    <Text>원</Text>
                                </HStack>
                                <HStack mt={3} w={"100%"} justifyContent={"flex-end"}>
                                    <Button type="submit" colorScheme="red">바로 구매</Button>
                                </HStack>
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </VStack>
    );
}