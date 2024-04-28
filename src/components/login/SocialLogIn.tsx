import { Button, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

export default function SocialLogIn() {
    const kakaoParams = {
        client_id: "7dfce64ff304bf27077e66600b312895",
        redirect_uri: "http://127.0.0.1:3000/user/login/kakao",
        response_type: "code",
    }
    const params = new URLSearchParams(kakaoParams).toString();
    return (
        <VStack w={"25%"} mt={4}>
            <Button
                as={"a"} 
                href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                leftIcon={<FaComment/>} 
                colorScheme="yellow" 
                width={"100%"}>
                카카오톡으로 로그인
            </Button>
        </VStack>
    );
}
