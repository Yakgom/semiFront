import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonWrapper,
  Container,
  Header,
  Pagination,
  SelectBox,
  Tab,
  Table,
  TabMenu,
  Td,
  Th,
  Thead,
  TitleTd,
  Tr,
  WriteButton,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const Board = () => {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);

  // 검색 기능
  const [searchType, setSearchType] = useState("title");
  const [keyword, setKeyword] = useState("");

  const navi = useNavigate();

  // 게시글 / 공지사항 불러오기
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        // 공지사항
        const noticeRes = await fetch("/api/board/notices");
        const noticeData = await noticeRes.json();

        // 일반 게시글
        const postRes = await fetch("/api/board/list?page=1");
        const postData = await postRes.json();

        setNotices(noticeData);
        setPosts(postData);
      } catch (err) {
        //console.error("게시판 데이터 로딩 실패:", err);
      }
    };
    fetchBoardData();
  }, []);

  // 🔍 검색 기능 실행
  const handleSearch = async () => {
    if (!keyword.trim()) return alert("검색어를 입력하세요!");

    const res = await fetch(
      `/api/board/search?type=${searchType}&keyword=${keyword}`
    );
    const data = await res.json();
    setPosts(data);
  };

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">일반 게시판</div>
      </Header>

      <TabMenu>
        <Tab active onClick={() => navi("/boards/")}>일반</Tab>
        <Tab onClick={() => navi("/boards/imgBoard")}>갤러리</Tab>
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
          {/* 공지사항 */}
          {notices.map((notice) => (
            <Tr key={notice.id}>
              <Td style={{ color: "red", fontWeight: "bold" }}>공지</Td>
              <TitleTd
                style={{ cursor: "pointer" }}
                onClick={() => navi(`/boards/${notice.id}`)}
              >
                {notice.title}
              </TitleTd>
              <Td>{notice.author}</Td>
              <Td>{notice.date}</Td>
              <Td>{notice.views}</Td>
            </Tr>
          ))}

          {/* 일반 게시글 */}
          {posts.map((post) => (
            <Tr key={post.id}>
              <Td>{post.id}</Td>
              <TitleTd
                style={{ cursor: "pointer" }}
                onClick={() => navi(`/boards/${post.id}`)}
              >
                {post.title}
              </TitleTd>
              <Td>{post.author}</Td>
              <Td>{post.date}</Td>
              <Td>{post.views}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {/* 글쓰기 버튼 */}
      <ButtonWrapper>
        <WriteButton onClick={() => navi("/boards/write")}>
          글쓰기
        </WriteButton>
      </ButtonWrapper>

      {/* 검색 영역 */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
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
            marginLeft: "10px",
            padding: "5px",
            border: "1px solid gray",
            borderRadius: "6px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            marginLeft: "10px",
            padding: "5px 15px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          검색
        </button>
      </div>
    </Container>
  );
};

export default Board;
