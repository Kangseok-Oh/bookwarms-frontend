import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";

export default function HomeCategory() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)
    return (
        <HStack mt={3} w={"100%"} alignItems={"flex-start"}>
            <>
                <Button ref={btnRef} onClick={onOpen} variant={"ghost"} leftIcon={<MdMenu/>}>도서 카테고리</Button>
                <Drawer
                        isOpen={isOpen}
                        placement='left'
                        onClose={onClose}
                        finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>도서 카테고리</DrawerHeader>
                    <DrawerBody>
                        <Accordion allowToggle>
                            <CategoryItem bigName="소설" smallName={{"한국소설": "01", "영미소설": "02", "일본소설": "03", "기타국가소설": "04"}}/>
                            <CategoryItem bigName="경영/경제" smallName={{"경영일반": "11", "경제일반": "12", "마케팅/세일즈": "13", "제태크/금융": "14"}}/>
                            <CategoryItem bigName="인문/사회 역사" smallName={{"인문": "21", "정치/사회": "22", "예술/문화": "23", "역사": "24"}}/>
                            <CategoryItem bigName="자기계발" smallName={{"성공/삶의자세": "31", "기획/창의": "32", "설득/화술/협상": "33", "취업/창업": "34"}}/>
                            <CategoryItem bigName="과학" smallName={{"수학": "41", "자연과학": "42", "응용과학": "43"}}/>
                            <CategoryItem bigName="컴퓨터/IT" smallName={{"개발/프로그래밍": "51", "IT비즈니스": "52", "IT자격증": "53", "컴퓨터/앱활용": "54"}}/>
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
                </Drawer>
            </>
            <Button variant={"ghost"}>기획전/이벤트</Button>
        </HStack>
    );
}

interface ICategoryItem {
    bigName: string
    smallName: {[key: string]: string}
}

type objType = {
    
}

function CategoryItem({bigName, smallName}:ICategoryItem) {
    const itemButton = () => {
        let buttonArray = [];
        for (const key in smallName) {
            buttonArray.push(<Button
                as={"a"}
                href={`/book/category/${smallName[key]}`}
                w={"100%"} 
                variant={"ghost"} 
                justifyContent={"flex-start"}>
                    {key}
                </Button>)
        }
        return buttonArray;
    }
    return (
        <AccordionItem>
            <AccordionButton>
                <Box flex={"1"} textAlign={"left"}>
                    {bigName}
                </Box>
                <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel>
                <VStack w={"100%"}>
                    {itemButton()}
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
}