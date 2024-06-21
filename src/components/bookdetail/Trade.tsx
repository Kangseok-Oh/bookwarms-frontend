import { Box, Text, Tabs, Tab, TabList, TabPanels, TabPanel, TableContainer, Table, Thead, Tr, Th, Tbody, Td, HStack, Button, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from 'recharts';
import { SellListApi, TradeChartApi, immediatePurPriceApi, immediateSellPriceApi, purchaseListApi } from '../../api';

// 거래 데이터 형식 지정
interface ITradeChart {
    trade_date: string
    trade_price: number
}

// 판매 데이터 형식 지정
interface ISellList {
    sell_price: number
    sell_count: number
}

// 구매 데이터 형식 지정
interface IPurchaseList {
    purchase_price: number
    purchase_count: number
}

// 컴포넌트 프롭 형식 지정
interface IBookId {
    bookId: string
}

// 즉시 구매가 데이터 형식 지정
interface IImmediatePurPrice {
    purchase_price: number
}

// 즉시 판매가 데이터 형식 지정
interface IImmediateSellPrice {
    sell_price: number
}

// 책 상세 페이지 거래 관련 UI 컴포넌트
export default function Trade({bookId} : IBookId) {
    // 거래 내역 데이터 호출
    const tradeChartQuery = useQuery<ITradeChart[]>({queryKey: ['getTradeChart', bookId], queryFn: TradeChartApi})
    const data = tradeChartQuery.data;
    // 판매 내역 데이터 호출
    const SellListQuery = useQuery<ISellList[]>({queryKey: ["getSellList", bookId], queryFn: SellListApi})
    // 구매 내역 데이터 호출
    const PurchaseListQuery = useQuery<IPurchaseList[]>({queryKey: ["getPurchaseList", bookId], queryFn: purchaseListApi})
    // 즉시 판매가 데이터 호출
    const immediateSellPriceQuery = useQuery<IImmediateSellPrice>({queryKey: ["getImmediateSellPrice", bookId], queryFn: immediateSellPriceApi})
    // 즉시 구매가 데이터 호출
    const immediatePurPriceQuery = useQuery<IImmediatePurPrice>({queryKey: ["getImmediatePurPrice", bookId], queryFn: immediatePurPriceApi})
    
    // 구매 내역 데이터 정렬
    PurchaseListQuery.data?.sort(function(a, b){
        return a.purchase_price + b.purchase_price;
    });
    // 판매 내역 데이터 정렬
    SellListQuery.data?.sort(function(a, b) {
        return a.sell_price - b.sell_price;
    });

    return (
        <Box width={"100%"}>
            {/* 거래 내역 그래프 */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data as any}>
                    <Line type={'linear'} strokeWidth={3} dataKey="trade_price" stroke="#8884d8" dot={{ fill: 'red', stroke: 'red' }}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip/>
                    <ReferenceLine />
                    <XAxis type='category' dataKey="trade_date"/>
                    <YAxis type='number' domain={['dataMin - 1500', 'dataMax + 1500']}/>
                </LineChart>
            </ResponsiveContainer>
            {/* 거래, 구매, 판매 내역 테이블 */}
            <Tabs isFitted size='md' variant='enclosed' mt={3}>
                <TabList>
                    <Tab>체결 내역</Tab>
                    <Tab>판매 입찰</Tab>
                    <Tab>구매 입찰</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                            <Tr>
                                <Th>체결 가격</Th>
                                <Th>체결 날짜</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {tradeChartQuery.data?.map((trade) => (
                                    <Tr>
                                        <Td>{trade.trade_price}</Td>
                                        <Td>{trade.trade_date}</Td>
                                    </Tr>
                                 ))}
                            </Tbody>
                        </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>판매 입찰가</Th>
                                    <Th>수량</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {SellListQuery.data?.map((sell) => (
                                    <Tr>
                                        <Td>{sell.sell_price}</Td>
                                        <Td>{sell.sell_count}</Td>
                                    </Tr>
                                 ))}
                            </Tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>구매 입찰가</Th>
                                    <Th>수량</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {PurchaseListQuery.data?.map((purchase) => (
                                    <Tr>
                                        <Td>{purchase.purchase_price}</Td>
                                        <Td>{purchase.purchase_count}</Td>
                                    </Tr>
                                 ))}
                            </Tbody>
                        </Table>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* 거래 버튼 */}
            <HStack w={"100%"}>
                <Button as={'a'} href={`/book/trade/sell/${bookId}`} w={'50%'} colorScheme={'blue'}>
                    <HStack>
                        <Text>판매 |</Text>
                        <VStack spacing={0}>
                            <Text fontSize={"small"}>{immediatePurPriceQuery.data?.purchase_price ? immediatePurPriceQuery.data?.purchase_price : "  -  "}원</Text>
                            <Text fontSize={"small"}>(즉시 판매)</Text>
                        </VStack>
                    </HStack>
                </Button>
                <Button as={'a'} href={`/book/trade/purchase/${bookId}`} w={'50%'} colorScheme={'red'}>
                    <HStack>
                        <Text>구매 |</Text>
                        <VStack spacing={0}>
                            <Text fontSize={"small"}>{immediateSellPriceQuery.data?.sell_price ? immediateSellPriceQuery.data?.sell_price : "  -  "}원</Text>
                            <Text fontSize={"small"}>(즉시 구매)</Text>
                        </VStack>
                    </HStack>
                </Button>
            </HStack>
        </Box>
    );
}