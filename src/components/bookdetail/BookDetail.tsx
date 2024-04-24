import { VStack, HStack, Image, Heading, Text, Button, IconButton } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function BookDetail() {
    return(
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack my={5} w={"100%"}>
                    <Image border='1px' maxW={"25%"} objectFit={"cover"} src="https://img.ridicdn.net/cover/5464000017/xxlarge#1"/>
                    <VStack ml={3} w={"75%"} alignItems={"flex-start"}>
                        <Heading fontSize={"xx-large"}>불변의 법칙</Heading>
                        <Text>절대 변하지 않는 것들에 대한 23가지 이야기</Text>
                        <HStack color={"red"}>
                            <FaStar/>
                            <Text fontSize={"small"}>4.0 (2)</Text>
                        </HStack>
                        <HStack>
                            <Text>모건 하우절 저</Text>
                            <Text>|</Text>
                            <Text>이수경 역</Text>
                            <Text>|</Text>
                            <Text>서삼독 출판</Text>
                        </HStack>
                        <VStack w={"100%"} mt={2} alignItems={"flex-start"} borderTopWidth={1}>
                            <HStack w={"100%"} mt={2} justifyContent={"space-between"}>                    
                                <Text>종이책 정가</Text>
                                <Text>25,000원</Text>
                            </HStack>
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                    <Text>전자책 정가</Text>
                                    <Text color={"blue"}>23,000원</Text>
                            </HStack>
                            <HStack w={"100%"} justifyContent={"space-between"}>
                                <Text>즉시 거래가</Text>
                                <Text color={"red"}>17,500원</Text>
                            </HStack>
                        </VStack>
                        <HStack w={"100%"} justifyContent={"flex-end"}>
                            <IconButton aria-label="like" icon={<FaRegHeart/>} />
                            <Button>장바구니 담기</Button>
                            <Button colorScheme="blue">바로 구매</Button>
                        </HStack>
                    </VStack>
                </HStack>
                <VStack w={"100%"}>
                    <HStack w={"100%"} alignItems={"flex-start"} borderBottomWidth={1}>
                        <Heading mb={2}>도서 소개</Heading>
                    </HStack>
                    <Text>
                          세계적인 베스트셀러 《돈의 심리학》의 저자 모건 하우절이 3년 만에 세상에 내놓은 신작.‘절대 변하지 않는 것들에 대한 23가지 이야기’를 전한다. 출간하자마자 아마존과 뉴욕타임스 베스트셀러 자리에 오르며 아마존 독자들과 오피니언 리더들의 극찬을 받았다. <br/>
                          이번 책은 돈과 투자 영역은 물론이고, 인간의 본성과 세상의 이치에 관한 이야기를 두루 다루어 한층 더 다층적이고 복합적인 메시지를 담아냈다는 평가를 받는다. <br/>
                          모건 하우절은 사람들은 무엇이 변할 것인지에 대해 늘 관심을 갖지만, 미래에 대비하기 위해서는 오히려 과거에도 지금도 미래에도 변함이 없는‘불변의 법칙’에 대해 알아야 한다고 강조한다. <br/>
                          이에 1000년 후에도 유효할 인간의 행동양식과 반복패턴에 대한 흥미로운 역사 스토리와 일화들을 들려준다. 워런 버핏의 스니커즈, 빌 게이츠의 숨겨진 불안, 유발 하라리가 받은 뜻밖의 비난, 게임스탑 사태의 보이지 않는 변수, 벌지 전투의 최후, 마술사 후디니의 죽음 등, 한 편 한 편의 이야기가 마치 다큐소설처럼 펼쳐진다. <br/>
                          흥미로운 일화 속에 인간사를 꿰뚫는 통찰과 삶의 교훈을 구슬처럼 꿰어내어 “역시 모건 하우절이다”라는 찬사를 받았다. 스콧 갤러웨이, 라이온 홀리데이는 물론, 국내 유수의 리더들 또한 먼저 읽고 “대단한 책이다”라는 평가를 내놓았다. <br/>
                    </Text>
                </VStack>
                <VStack w={"100%"} mt={10}>
                    <HStack w={"100%"} alignItems={"flex-start"} borderBottomWidth={1}>
                        <Heading mb={2}>저자 소개</Heading>
                    </HStack>
                    <Text>
                    세계적인 베스트셀러 《돈의 심리학》의 저자. <br/>
                    3년 만에 내놓은 신작 《불변의 법칙》은 출간 즉시 아마존 베스트셀러, 뉴욕타임스 베스트셀러 자리에 올랐다. 모건 하우절은 이번 책에서 영원히 변하지 않는 인간 불변의 법칙이 담긴 23개 이야기를 전한다. <br/>
                    돈과 투자의 영역은 물론 그 너머 인생과 성공, 인간의 욕망과 행동편향을 두루 다루어 보다 다각적이고 통합적인 메시지를 함축해내어 최고의 스토리텔러라는 찬사를 받았다. <br/>
                    모건 하우절은〈월스트리트저널〉 기자로 일했으며, 현재 경제 매거진이자 팟캐스트 〈모틀리풀〉 칼럼니스트로 활동하고 있다. 벤처캐피털사 콜라보레이티브 펀드의 파트너이기도 하다. 미국 비즈니스 편집자 및 작가 협회에서 수여하는 최우수 비즈니스상과 뉴욕타임스 시드니상을 두 차례 수상한 바 있다.
                    </Text>
                </VStack>
            </VStack>
        </VStack>
    )
}