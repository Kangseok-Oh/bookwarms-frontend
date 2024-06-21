import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// 잘못된 URL 이동 시 보여지는 NotFound 화면 컴포넌트
export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Heading>Page not found.</Heading>
            <Text>찾으시는 페이지가 없네요. ㅠㅠ</Text>
            <Link to="/">
                {/* 홈 화면 돌아가기 */}
                <Button colorScheme={"red"} variant={"link"}>홈 화면으로 돌아가기&rarr;</Button>
            </Link>
        </VStack>
    );
}