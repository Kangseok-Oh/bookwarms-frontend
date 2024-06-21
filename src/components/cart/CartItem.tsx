import { HStack, Checkbox,  VStack, Image, Text, IconButton, useToast} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import { deleteCartApi } from "../../api";

// 책 데이터 형식 지정
interface ICartItem {
    bookIsbn: string;
    coverImage: string;
    bookName: string;
    authorName: string;
    bookPrice: number;
    isChecked: boolean;
    onChange: (e:  React.ChangeEvent<HTMLInputElement>) => void
}

// 장바구니 내 책 아이템 컴포넌트
export default function CartItem({bookIsbn, coverImage, bookName, authorName, bookPrice, isChecked, onChange}: ICartItem) {
    const toast = useToast();
    const queryClient = useQueryClient();

    // 아이템 삭제 처리
    const mutation = useMutation({mutationFn: deleteCartApi,
        // 삭제 완료되면 장바구니 데이터 재호출
        onSuccess: (data) => {
            window.location.replace("/user/cart")
        }
    });

    // 삭제 버튼 클릭 리스너
    const onClick = () => {
        mutation.mutate([bookIsbn,])
    }
    return (
        <HStack mt={1} pb={3} w={"100%"} justifyContent={"space-between"} borderBottomWidth={1}>
            <HStack>
                <Checkbox isChecked={isChecked} onChange={onChange} mr={5}/>
                <HStack maxH={200} overflow={"hidden"}>
                    <Image border={"1px"} objectFit={"cover"} maxH={200} src={coverImage}/>
                    <VStack ml={3} alignItems={"flex-start"}>
                        <Text fontSize={"large"}>{bookName}</Text>
                        <Text fontSize={"small"} mt={-2} color={"gray.500"}>{authorName}</Text>
                    </VStack>
                </HStack>
            </HStack>
            <HStack>
                <Text>{bookPrice}원</Text>
                <IconButton onClick={onClick} aria-label="delete items" variant={"ghost"} icon={<IoMdClose/>}/>
            </HStack>
        </HStack>
    );
}