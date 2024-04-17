import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Header from "./header/Header";

export default function Root() {
    return (
        <Box>
            <Header/> 
            <Outlet/>
        </Box>
    );
}