import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Header from "./header/Header";

// 기본 화면 템플릿, 헤더->내용 구조
export default function Root() {
    return (
        <Box>
            <Header/> 
            <Outlet/>
        </Box>
    );
}