import { Button, VStack } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

export default function SocialLogIn() {
    return (
        <VStack w={"25%"} mt={4}>
            <Button
                as={"a"} 
                href={`https://kauth.kakao.com/oauth/authorize?`}
                leftIcon={<FaComment/>} 
                colorScheme="yellow" 
                width={"100%"}>
                카카오톡으로 로그인
            </Button>
        </VStack>
    );
}
