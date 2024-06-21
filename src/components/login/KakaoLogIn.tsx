import { Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogInApi } from "../../api";
import { useEffect } from "react";

// 카카오톡 화면 로딩창 컴포넌트
export default function KakaoLogIn() {
    // 파라미터 코드 데이터 추출
    const {search} = useLocation()
    const params = new URLSearchParams(search);
    const code = params.get("code");

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // 카카오톡 로그인 처리
    const mutation = useMutation({mutationFn: kakaoLogInApi,
        onSuccess: (data) => {
            // 성공 시 홈 화면 이동
            if (data === 200) {
                navigate("/");
                queryClient.refetchQueries({queryKey: ["getUserInfo"]});      
            }
            // 실패 시 로그인 화면 이동
            if (data === 400) {
                navigate("/user/login")
            }    
        }
    });

    // 코드로 카카오톡 로그인, 페이지 처음 로딩시 딱 한 번 수행
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