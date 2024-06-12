import { Input, VStack, HStack, Select, Button, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { submitReviewApi } from "../../api";

interface IReviewForm {
    content: string;
    rating: number;
}

interface IBookId {
    bookId: string
}

export default function ReviewInput({bookId}: IBookId) {
    const toast = useToast();

    const {register, handleSubmit, formState:{errors}, control} = useForm<IReviewForm>();
    const mutation = useMutation({mutationFn: submitReviewApi, 
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

    const ratingOption = () => {
        let optionArray = [];
        const valueArray = [1.0, 2.0, 3.0, 4.0, 5.0];

        for (let i = 0; i < 5; i++) {
            const rating = valueArray[i]
            optionArray.push(<option value={rating}>{rating}</option>)
        }
        return optionArray;
    }

    const onSubmit = ({content, rating}: IReviewForm) => {
        mutation.mutate({content, rating, bookId});
    }

    return (
        <VStack mt={10} pb={5} w={"100%"} borderBottomWidth={0.3} as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Input w={"80%"} h={"200"} variant={"filled"} {...register("content", {required: "내용을 입력하세요"})} />
            <HStack w={"80%"} justifyContent={"space-between"}>
                <HStack w={150}>
                    <FaStar color="red"/>
                    <Controller
                        name = "rating"
                        control = {control}
                        render = {({field}) => {
                            return (
                                <Select {...field}>{ratingOption()}</Select>
                            )
                        }}
                    />
                </HStack>
                <Button type='submit'>리뷰 남기기</Button>
            </HStack>
        </VStack>
    );
}