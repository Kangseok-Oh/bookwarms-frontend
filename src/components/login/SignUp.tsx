import { Box, Button, Input, InputGroup, InputLeftElement, VStack, Text, Select, HStack, useToast } from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import SocialLogIn from "./SocialLogIn";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../api";
import { getValue } from "@testing-library/user-event/dist/utils";

interface IForm {
    email: string;
    password: string;
    name: string;
    gender: string;
    year: string;
    month: string;
    day: string;
}


export default function SignUp() {
    const toast = useToast();
    const {register, handleSubmit, formState:{errors}, control} = useForm<IForm>();
    const mutation = useMutation({mutationFn: signUpApi,
        onSuccess: (data) => {
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            if (data.ok) {
                toast({
                    title: "회원가입 성공!",
                    status: "success"
                })
            }
        },
    })
    const onSubmit = ({email, password, name, gender, year, month, day}: IForm) => {
        const birth = year + "-" + month + "-" + day;
        mutation.mutate({email, password, name, gender, birth})
    }

    const yearOption = () => {
        let optionArray = [];
        for (let i = 1900; i < 2025; i++) {
            const text = String(i)
            optionArray.push(<option value={i}>{i}</option>)
        }
        return optionArray;
    }
    const monthOption = () => {
        let optionArray = [];
        for (let i = 1; i < 13; i++) {
            const text = String(i).padStart(2, "0");
            optionArray.push(<option value={text}>{text}</option>)
        }
        return optionArray;
    }
    const dayOption = () => {
        let optionArray = [];
        for (let i = 1; i < 32; i++) {
            const text = String(i).padStart(2, "0");
            optionArray.push(<option value={text}>{text}</option>)
        }
        return optionArray;
    }
    
    return(
        <VStack mt={"10%"}>
            <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} w={"25%"} borderBottomWidth={1}>
                <Text as={"b"} fontSize={"3xl"} mb={3}>BookWarms</Text>
                <InputGroup>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaUser/>
                        </Box>
                    }/>
                    <Input 
                        {...register("email", {required: "이메일을 입력해주세요"})}
                        variant={"filled"} 
                        placeholder="이메일"/>
                </InputGroup>
                <InputGroup mt={2}>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaLock/>
                        </Box>
                    }/>
                    <Input
                        {...register("password", {required: "비밀번호을 입력해주세요"})}
                        type="password" 
                        variant={"filled"} 
                        placeholder="비밀번호"/>
                </InputGroup>
                <InputGroup mt={2}>
                    <InputLeftElement children={
                        <Box color={"gray.400"}>
                            <FaUserTag/>
                        </Box>
                    }/>
                    <Input
                        {...register("name", {required: "이름을 입력해주세요"})} 
                        variant={"filled"} 
                        placeholder="이름"/>
                </InputGroup>
                <Controller
                    name="gender"
                    control={control}
                    render={({field}) => {
                        return(
                            <Select
                                placeholder="성별" 
                                mt={2}
                                {...field}>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </Select>
                        );
                    }}
                />
                <HStack w={"100%"}>
                    <Controller
                        name="year"
                        control={control}
                        render={({field}) => {
                            return(
                                <Select
                                    placeholder="생년" 
                                    mt={2}
                                    {...field}>
                                    {yearOption()}
                                </Select>
                            );
                        }}
                    />
                    <Controller
                        name="month"
                        control={control}
                        render={({field}) => {
                            return(
                                <Select
                                    placeholder="월" 
                                    mt={2}
                                    {...field}>
                                    {monthOption()}
                                </Select>
                            );
                        }}
                    />
                    <Controller
                        name="day"
                        control={control}
                        render={({field}) => {
                            return(
                                <Select
                                    placeholder="일" 
                                    mt={2}
                                    {...field}>
                                    {dayOption()}
                                </Select>
                            );
                        }}
                    />
                </HStack>
                <Button type="submit" marginTop={4} colorScheme="red" width={"100%"} mb={4}>가입하기</Button>
            </VStack>
            <SocialLogIn/>
        </VStack>
    );
}