import { Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogInApi } from "../../api";
import { useEffect } from "react";


export default function KakaoLogIn() {
    const {search} = useLocation()
    const params = new URLSearchParams(search);
    const code = params.get("code");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({mutationFn: kakaoLogInApi,
        onSuccess: (data) => {
            if (data === 200) {
                navigate("/");
                queryClient.refetchQueries({queryKey: ["getUserInfo"]});      
            }
            if (data === 400) {
                navigate("/user/login")
            }    
        }
    });
    useEffect(() => {
        if (code) {
            mutation.mutate(code)
        }
    }, [])
    return (
        <VStack justifyContent={"center"} mt={40} >
            <Heading>카카오톡 로그인 중</Heading>
            <Text>잠시만 기다려 주세요</Text>
            <Spinner size={"lg"}/>
        </VStack>
    )
}