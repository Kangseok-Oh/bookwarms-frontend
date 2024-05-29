import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, TableContainer, Table, Thead, Tr, Th, Tbody, Td, HStack, Button } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from 'recharts';


export default function renderLineChart() {
    const data = [{
        name: 'Page A',
        price: 10000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        price: 9500,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        price: 9700,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        price: 9900,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        price: 9600,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        price: 9000,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        price: 9300,
        pv: 4300,
        amt: 2100,
      },];

    return (
        <Box width={"100%"}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <Line type={'linear'} strokeWidth={3} dataKey="price" stroke="#8884d8" dot={{ fill: 'red', stroke: 'red' }}/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip/>
                    <ReferenceLine />
                    <XAxis type='category' dataKey="name"/>
                    <YAxis type='number' domain={['dataMin - 1500', 'dataMax + 1500']}/>
                </LineChart>
            </ResponsiveContainer>
            <Tabs size='md' mt={3}>
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
                            <Tr>
                                <Td>10000원</Td>
                                <Td>2024/05/22</Td>
                            </Tr>
                            <Tr>
                                <Td>9500원</Td>
                                <Td>2024/05/23</Td>
                            </Tr>
                            <Tr>
                                <Td>9700원</Td>
                                <Td >2024/05/26</Td>
                            </Tr>
                            </Tbody>
                        </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <p>판매 입찰 내역</p>
                    </TabPanel>
                    <TabPanel>
                        <p>구매 입찰 내역</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <HStack w={"100%"}>
                <Button as={'a'} href='/book/booktrade' w={'50%'} colorScheme={'blue'}>판매 입찰하기</Button>
                <Button as={'a'} href='/book/booktrade' w={'50%'} colorScheme={'red'}>구매 입찰하기</Button>
            </HStack>
        </Box>
    );
}