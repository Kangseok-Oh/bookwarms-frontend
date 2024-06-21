import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { FaBook, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { userInfoApi, logOutApi } from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

// 모든 페이지 공통 헤더 컴포넌트
export default function Header() {
    // 유저 정보 호출
    const {isLoading, data, isError} = useQuery({queryKey: ['getUserInfo'], queryFn: userInfoApi, retry: false});

    const queryClient = useQueryClient();

    const navigate =useNavigate();
    // 검색 데이터
    const [userInput, setUserInput] = useState<string>('');

    // 로그아웃 처리
    const mutation = useMutation({mutationFn: logOutApi,
        onSuccess: () => {
            queryClient.refetchQueries({queryKey: ['getUserInfo']});
        }
    }) 

    // 로그아웃 버튼 클릭 리스너
    const onLogOut = async () => {
        mutation.mutate()
    }

    // 검색창 submit 리스너
    const onSubmit = (e:React.FormEvent<HTMLInputElement>) => {
        navigate(`/book/search/${userInput}`)
    }

    // 검색 데이터 변화 감지
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    }

    return (
        <VStack alignItems={"center"}>
            <HStack width={"70%"} justifyContent={"flex-end"}>
                <HStack>
                    <Button fontSize={"small"} variant={"ghost"}>고객센터</Button>
                    {/* 로그인 하면 회원 정보, 로그아웃하거나 로그인 실패 시 버튼부 보여주기 */}
                    {!isLoading ? (isError ? 
                        <>
                            <Link to={"/user/signup"}>
                                <Button fontSize={"small"} variant={"ghost"}>회원가입</Button>
                            </Link>        
                            <Link to={"/user/login"}>
                                <Button fontSize={"small"} variant={"ghost"}>로그인</Button>
                            </Link>
                        </> :
                        <>
                            <Text fontSize={'small'}>{data.user_name}님 안녕하세요!</Text>
                            <Text fontSize={'small'}>|  잔액: {data.user_cash}원</Text>
                            <Button onClick={onLogOut} fontSize={"small"} variant={"ghost"}>로그아웃</Button>
                        </>
                    ):null}
                </HStack>
            </HStack>
            <HStack width={"70%"} mt={2} pb={6} justifyContent={"space-between"} borderBottomWidth={1}>
                <Box>
                    <Link to={"/"}>
                        <Text as={"b"} fontSize={"3xl"}>BookWarms</Text>
                    </Link>
                </Box>
                <HStack>
                    <InputGroup minW={300} mr={10} as={'form'} onSubmit={onSubmit}>
                        <InputLeftElement pointerEvents={"none"}>
                            <FaSearch color="gray"/>
                        </InputLeftElement>
                        <Input variant={'filled'} size='lg' placeholder="검색" onChange={onChange}/>
                    </InputGroup>
                    <HStack spacing={10}>
                        {/* 로그인 상태이면 각각의 페이지로 이동, 로그인 상태가 아니면 로그인 화면으로 이동 */}
                        <IconButton as={"a"} href={!isLoading ? (isError ? "/user/login" : "/user/bookshelf") : "/"} variant={"ghost"} aria-label="to go bookshelf" icon={<FaBook size={'lg'}/>}/>
                        <IconButton as={"a"} href={!isLoading ? (isError ? "/user/login" : "/user/cart") : "/"} variant={"ghost"} aria-label="to go bookcart" icon={<FaShoppingCart size={'lg'}/>}/>
                        <IconButton variant={"ghost"} aria-label="to go mypage" icon={<FaUser size={'lg'}/>}/>
                    </HStack>
                </HStack>
            </HStack>
        </VStack>
    );
}