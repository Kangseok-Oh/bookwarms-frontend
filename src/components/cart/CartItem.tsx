import { HStack, Checkbox,  VStack, Image, Text, IconButton, useToast} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import { deleteCartApi } from "../../api";

interface ICartItem {
    bookIsbn: string;
    coverImage: string;
    bookName: string;
    authorName: string;
    bookPrice: number;
    isChecked: boolean;
    onChange: (e:  React.ChangeEvent<HTMLInputElement>) => void
}

export default function CartItem({bookIsbn, coverImage, bookName, authorName, bookPrice, isChecked, onChange}: ICartItem) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({mutationFn: deleteCartApi,
        onSuccess: (data) => {
            queryClient.refetchQueries({queryKey: ["getCartList"]}); 
        }
    });

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