import { Box, Input, InputGroup, InputLeftElement, VStack, Text, Button, HStack, Grid, useToast } from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserLogInVariables, IUsernameLoginError, IUsernameLoginSuccess, logInApi } from "../../api";

// 로그인 시 보낼 데이터 형식 지정
interface ILogInForm {
    email: string;
    password: string;
}

export default function LogIn() {
    const navigate = useNavigate();
    const toast = useToast();
    const {register, handleSubmit, formState:{errors}} = useForm<ILogInForm>();
    const queryClient = useQueryClient();

    // 로그인 처리
    const mutation = useMutation({mutationFn: logInApi,
        onSuccess: (data) => {
            // 실패하면 실패한 이유 띄워줌
            if (data.error) {
                toast({
                    title: `${data.error}`,
                    status: "error"
                })
            }
            // 성공하면 홈 화면 이동
            if (data.ok) {
                navigate("/", {replace: true});
                queryClient.refetchQueries({queryKey: ['getUserInfo']})
            }
        }
    });

    // 로그인 폼 submit 리스너
    const onSubmit = ({email, password}: ILogInForm) => {
        mutation.mutate({email, password})
    }
    return (
        <VStack mt={"10%"}>
            <VStack w={"25%"} borderBottomWidth={1}>
                <Text as={"b"} fontSize={"3xl"} mb={3}>BookWarms</Text>
                <Box as="form" w={"100%"} onSubmit={handleSubmit(onSubmit)}>
                    {/* 이메일 */}
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
                    {/* 패스워드 */}
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
                    {/* 로그인 버튼 */}
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