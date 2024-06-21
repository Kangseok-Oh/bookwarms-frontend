import { Input, VStack, HStack, Select, Button, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { submitReviewApi } from "../../api";

// 리뷰 데이터 형식 지정
interface IReviewForm {
    content: string;
    rating: number;
}

// 컴포넌트 프롭 형식 지정
interface IBookId {
    bookId: string
}

// 리뷰 작성칸 컴포넌트
export default function ReviewInput({bookId}: IBookId) {
    const toast = useToast();

    const {register, handleSubmit, formState:{errors}, control} = useForm<IReviewForm>();
    // 리뷰 작성 처리
    const mutation = useMutation({mutationFn: submitReviewApi, 
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

    // 리뷰 폼 submit 리스너
    const onSubmit = ({content, rating}: IReviewForm) => {
        mutation.mutate({content, rating, bookId});
    }
    
    // 평점 옵션 컴포넌트 1부터 5까지로 지정
    const ratingOption = () => {
        let optionArray = [];
        const valueArray = [1.0, 2.0, 3.0, 4.0, 5.0];

        for (let i = 0; i < 5; i++) {
            const rating = valueArray[i]
            optionArray.push(<option value={rating}>{rating}</option>)
        }
        return optionArray;
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