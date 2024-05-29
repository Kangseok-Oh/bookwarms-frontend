import { VStack, HStack, Text, Checkbox, Button, useToast} from "@chakra-ui/react";
import { useMutation, useQuery} from "@tanstack/react-query";
import { cartListApi, deleteCartApi } from "../../api";
import CartItem from "./CartItem";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ICartList {
    cart_user_email: string;
    cart_total_items: number;
    cart_total_price: number;
    cartitem_set: ICartName[]
}

interface ICartName {
    cart_book_isbn: ICartItem
}

interface ICartItem {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_price: number;
    book_author_name: string;
}

export default function Cart() {
    const {data} = useQuery<ICartList>({queryKey: ['getCartList'], queryFn: cartListApi})
    const toast = useToast();

    const [checkedBookIsbn, setCheckedBookIsbn] = React.useState<string[]>([]);
    const [checkedItems, setCheckedItems] = React.useState(data?.cartitem_set.map(() => false));

    const allChecked = checkedItems?.every(Boolean)

    const checkedBookHandler = (isbn:string, isChecked:boolean) => {
        if (isChecked) {
            setCheckedBookIsbn((prev) => [...prev, isbn]);
            return;
        }
        if (!isChecked && checkedBookIsbn.includes(isbn)) {
            setCheckedBookIsbn(checkedBookIsbn.filter((item) => item !== isbn));
            return;
        }
        return;
    }

    const allCheckedBookHandler = (isChecked:boolean) => {
        if (isChecked) {
            data?.cartitem_set.map((item) => {
                if (!(checkedBookIsbn.includes(item.cart_book_isbn.book_isbn))) {
                    setCheckedBookIsbn((prev) => [...prev, item.cart_book_isbn.book_isbn])
                }
            })
            return;
        }

        if (!isChecked) {
            setCheckedBookIsbn([])
            return;
        }
    }

    const navigate = useNavigate();
    const mutation = useMutation({mutationFn: deleteCartApi,
        onSuccess: (data) => {
            window.location.replace("/user/cart")
        }
    });

    const onClick = () => {
        console.log(checkedBookIsbn)
        mutation.mutate(checkedBookIsbn)
    }

    return(
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack w={"100%"} alignItems={"flex-start"} mt={5}>
                    <Text fontSize={"xx-large"}>
                        장바구니({data?.cart_total_items})
                    </Text>
                </HStack>
                <HStack w={"100%"} py={2} justifyContent={"space-between"} borderBottomWidth={1}>
                    <Checkbox
                        isChecked={allChecked}
                        onChange={(e) => {
                            setCheckedItems(data?.cartitem_set.map(() => e.target.checked));
                            allCheckedBookHandler(e.target.checked);
                        }}
                    >
                        전체
                    </Checkbox>
                    <Button onClick={onClick} variant={"ghost"} color={"red"}>삭제</Button>
                </HStack>
                    {data?.cartitem_set.map((item, index) => <CartItem
                        bookIsbn={item.cart_book_isbn.book_isbn}
                        coverImage={item.cart_book_isbn.book_cover_path}
                        bookName={item.cart_book_isbn.book_name}
                        bookPrice={item.cart_book_isbn.book_price}
                        authorName={item.cart_book_isbn.book_author_name}
                        isChecked={checkedItems ? checkedItems[index]: false}
                        onChange={(e) => {
                            if (checkedItems) {
                                setCheckedItems([
                                    ...checkedItems.slice(0, index),
                                    e.target.checked,
                                    ...checkedItems.slice(index + 1)
                                ])
                                checkedBookHandler(item.cart_book_isbn.book_isbn, e.target.checked);
                            }
                        }}
                        />
                    )}
                <HStack w={"100%"} justifyContent={"flex-end"}>
                    <VStack>
                        <Text mt={2}>총 {data?.cart_total_price}원</Text>
                        <Button 
                            mt={2} 
                            w={100} 
                            colorScheme={"red"}
                            onClick={(e) => {
                                if (checkedBookIsbn.length == 0) {
                                    toast({
                                        title: '구매할 책이 없습니다!',
                                        status: "error"
                                    })
                                } else {
                                    navigate("/payment", {state: checkedBookIsbn})
                                }
                            }}>결제하기</Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}