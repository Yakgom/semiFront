import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Header,
  Tab,
  TabMenu,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TitleTd,
  Pagination,
  ButtonWrapper,
  WriteButton,
  SelectBox,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");

  const navi = useNavigate();

  // 페이지별 게시글 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8081/boards/boards?page=${page}`)
      .then((response) => {
        setBoards(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((err) => {
        console.error("게시판 페이지 로딩 실패:", err);
      });
  }, [page]);

  // 조회수 증가 + 상세 페이지 이동
  const handleView = (id) => {
    axios
      .post(`http://localhost:8081/boards/boards/${id}/view`)
      .then(() => navi(`/boards/boards/${id}`))
      .catch(() => navi(`/boards/boards/${id}`));
  };

  // 검색
  const handleSearch = () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    axios
      .get("http://localhost:8081/boards/boards/search", {
        params: { type: searchType, keyword, page },
      })
      .then((res) => {
        setBoards(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("검색 실패:", err));
  };

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">일반 게시판</div>
      </Header>

      <TabMenu>
        <Tab onClick={() => navi("/boards/notices")}>공지사항</Tab>
        <Tab $active onClick={() => navi("/boards/boards")}>일반</Tab>
        <Tab onClick={() => navi("/boards/imgBoards")}>갤러리</Tab>
      </TabMenu>

      <Table>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>작성일</Th>
            <Th>조회</Th>
          </Tr>
        </Thead>

        <tbody>
          {boards.map((board) => (
            <Tr key={board.boardNo}>
              <Td>{board.boardNo}</Td>
              <TitleTd
                onClick={() => handleView(board.boardNo)}
                style={{ cursor: "pointer" }}
              >
                {board.boardTitle}
              </TitleTd>
              <Td>{board.boardWriter}</Td>
              <Td>{board.boardDate}</Td>
              <Td>{board.boardCount}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            style={{
              padding: "6px 10px",
              margin: "0 4px",
              background: page === i ? "black" : "lightgray",
              color: page === i ? "white" : "black",
              borderRadius: "4px",
            }}
          >
            {i + 1}
          </button>
        ))}
      </Pagination>

      <ButtonWrapper>
        <WriteButton onClick={() => navi("/boards/boards/write")}>
          글쓰기
        </WriteButton>
      </ButtonWrapper>

      {/* 검색 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 20,
          gap: "10px",
        }}
      >
        <SelectBox onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="content">내용</option>
        </SelectBox>

        <input
          type="text"
          placeholder="검색어 입력"
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            height: "40px",
            padding: "0 10px",
            fontSize: "14px",
            border: "1px solid gray",
            borderRadius: "6px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            height: "40px",
            padding: "0 20px",
            fontSize: "14px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
          }}
        >
          검색
        </button>
      </div>
    </Container>
  );
};

export default Board;
