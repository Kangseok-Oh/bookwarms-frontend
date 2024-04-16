import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Heading>Page not found.</Heading>
            <Text>찾으시는 페이지가 없네요. ㅠㅠ</Text>
            <Link to="/">
                <Button colorScheme={"red"} variant={"link"}>홈 화면으로 돌아가기&rarr;</Button>
            </Link>
        </VStack>
    );
}