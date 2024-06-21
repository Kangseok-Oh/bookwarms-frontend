import { HStack, VStack, Button, Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Epub from 'epubjs';
import { useParams } from 'react-router-dom';
import { bookDetailApi } from '../../api';

interface IBookDetailForm {
    book_isbn: string;
    book_cover_path: string;
    book_name: string;
    book_rating: number;
    book_review_count: number;
    book_price: number;
    book_author_name: string;
    book_publisher: string;
    book_interpreter: string;
    book_intro: string;
    book_contents: string;
    book_author_intro: string;
    book_ebook_path: string;
}

// 전자책 뷰어 컴포넌트
export default function BookViewer() {
    // 책 isbn 파라미터에서 추출
    const {bookId} = useParams();
    // 책 데이터 호출
    const bookDetailQuery = useQuery<IBookDetailForm>({queryKey: ['getBookDetail', bookId], queryFn: bookDetailApi})
    const bookData = bookDetailQuery.data;
    
    // pdf 파일 경로 지정
    const book = Epub(bookData? bookData.book_ebook_path: "");

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