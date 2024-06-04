import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, TableContainer, Table, Thead, Tr, Th, Tbody, Td, HStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from 'recharts';
import { SellListApi, TradeChartApi, purchaseListApi } from '../../api';

interface ITradeChart {
    trade_date: string
    trade_price: number
}

interface ISellList {
    sell_price: number
    sell_count: number
}

interface IPurchaseList {
    purchase_price: number
    purchase_count: number
}

interface IBookId {
    bookId: string
}

export default function Trade({bookId} : IBookId) {
    const tradeChartQuery = useQuery<ITradeChart[]>({queryKey: ['getTradeChart', bookId], queryFn: TradeChartApi})
    const SellListQuery = useQuery<ISellList[]>({queryKey: ["getSellList", bookId], queryFn: SellListApi})
    const PurchaseListQuery = useQuery<IPurchaseList[]>({queryKey: ["getPurchaseList", bookId], queryFn: purchaseListApi})
    PurchaseListQuery.data?.sort(function(a, b){
        return a.purchase_price + b.purchase_price;
    });

    SellListQuery.data?.sort(function(a, b) {
        return a.sell_price - b.sell_price;
    });

    const data = tradeChartQuery.data;

    return (
        <Box width={"100%"}>
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
            <HStack w={"100%"}>
                <Button as={'a'} href={`/book/trade/sell/${bookId}`} w={'50%'} colorScheme={'blue'}>판매 입찰하기</Button>
                <Button as={'a'} href={`/book/trade/purchase/${bookId}`} w={'50%'} colorScheme={'red'}>구매 입찰하기</Button>
            </HStack>
        </Box>
    );
}