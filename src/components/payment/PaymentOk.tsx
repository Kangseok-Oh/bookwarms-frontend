import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// 결제 성공 화면 컴포넌트
export default function PaymentOk() {
    return(
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Heading>결제 완료</Heading>
            <Text>즐거운 독서 되세요!</Text>
            {/* 내 서재로 이동 */}
            <Link to="/user/bookshelf">
                <Button colorScheme={"red"} variant={"link"}>읽으러 가기&rarr;</Button>
            </Link>
        </VStack>
    );
}