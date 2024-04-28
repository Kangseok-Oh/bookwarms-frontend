import { Box, Input, InputGroup, InputLeftElement, VStack, Text, Button, HStack, Grid, useToast } from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserLogInVariables, IUsernameLoginError, IUsernameLoginSuccess, logInApi } from "../../api";

interface ILogInForm {
    email: string;
    password: string;
}

export default function LogIn() {
    const navigate = useNavigate();
    const toast = useToast();
    const {register, handleSubmit, formState:{errors}} = useForm<ILogInForm>();
    const queryClient = useQueryClient();
    const mutation = useMutation({mutationFn: logInApi,
        onSuccess: (data) => {
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            if (data.ok) {
                navigate("/", {replace: true});
                queryClient.refetchQueries({queryKey: ['getUserInfo']})
            }
        }
    });
    const onSubmit = ({email, password}: ILogInForm) => {
        mutation.mutate({email, password})
    }
    return (
        <VStack mt={"10%"}>
            <VStack w={"25%"} borderBottomWidth={1}>
                <Text as={"b"} fontSize={"3xl"} mb={3}>BookWarms</Text>
                <Box as="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color={"gray.400"}>
                                <FaUser/>
                            </Box>}/>
                        <Input
                            {...register("email", {required: "이메일을 입력하세요", })}
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
                            {...register("password", {required: "비밀번호을 입력하세요"})} 
                            type="password" 
                            variant={"filled"} 
                            placeholder="비밀번호"/>
                    </InputGroup>
                    <Button type="submit" marginY={4} colorScheme="red" width={"100%"}>로그인</Button>
                </Box>
                <Grid mb={4} w={"100%"} templateColumns={"repeat(3, 1fr)"}>        
                    <Button as={"a"} href="/user/signup" rounded={0} variant={"ghost"} borderRightWidth={1}>회원가입</Button>
                    <Button rounded={0} variant={"ghost"} borderRightWidth={1}>아이디찾기</Button>
                    <Button rounded={0} variant={"ghost"}>비밀번호찾기</Button>
                </Grid>
            </VStack>
            <SocialLogIn/>
        </VStack>
    )
}