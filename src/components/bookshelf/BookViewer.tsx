import { HStack, VStack, Button, Box } from '@chakra-ui/react';
import Epub from 'epubjs';

export default function BookViewer() {
    const book = Epub('https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf');
    const rendition = book.renderTo('area');
    const displayed = rendition.display();
    return(
        <VStack alignItems={"center"}>
            <VStack w={"70%"}>
                <HStack>
                    <Button onClick={() => rendition.prev()}>이전 페이지</Button>
                    <Button onClick={() => rendition.next()}>다음 페이지</Button>
                </HStack>
                <Box>
                    <div id='area'></div>
                </Box>
            </VStack>
        </VStack>
    );
}