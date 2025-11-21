import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import CommentForm from "../Comment/CommentForm.jsx";

import {
  Container,
  Header,
  Title,
  BoardWriter,
  BoardContent,
  Button,
  BottomArea,
  TopButtonRow,
  CommentArea,
  CommentWriteTitle,
  CommentInput,
  CommentDisabledBox,
  CommentWriteButtonRow,
  CommentTable,
  CommentHeadCell,
  CommentCell,
  CommentActionButton,
} from "./Board.styles";
import gasipan from "../../../assets/gasipan.png";

const BoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const { auth } = useContext(AuthContext);

  //  수정 모드 관련 상태
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 댓글
  const BoardDetail = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [board, setBoard] = useState(null);
  const { auth } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  //  댓글 관련 상태
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const isLoggedIn = auth?.isAuthenticated;


  // 상세 조회
  useEffect(() => {
    if (!auth?.accessToken) {
      alert("로그인이 필요합니다.");
      navi("/members/login");
      return;
    }

    axios
      .get(`http://localhost:8081/boards/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setBoard(res.data);
        // 처음 로딩할 때 수정용 값도 같이 세팅
        setEditTitle(res.data.boardTitle);
        setEditContent(res.data.boardContent);
      })
      .catch((err) => {
        console.error("상세보기 로딩 실패:", err);
        alert("게시글을 불러오는 데 실패했습니다.");
        navi("/boards/boards");
      });
  }, [id, auth, navi]);

  //  댓글 목록 조회
  useEffect(() => {
    if (!board) return;
    const boardNo = board.boardNo || id;

    axios
      .get(`http://localhost:8081/comments?boardNo=${boardNo}`)
      .then((res) => setComments(res.data || []))
      .catch((err) => console.error("댓글 조회 실패:", err));
  }, [board, id]);

    //  댓글 등록
  const handleInsertComment = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      if (window.confirm("댓글 작성을 하시려면 로그인 해주세요.\n로그인 페이지로 이동할까요?")) {
        navi("/members/login");
      }
      return;
    }

    if (commentContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const boardNo = board.boardNo || id;

    axios
      .post(
        "http://localhost:8081/comments",
        {
          refBoardNo: boardNo,
          commentContent: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          alert("댓글이 등록되었습니다.");
          setCommentContent("");
          // 다시 불러오기
          return axios.get(`http://localhost:8081/comments?boardNo=${boardNo}`);
        }
      })
      .then((res) => {
        if (res) setComments(res.data || []);
      })
      .catch((err) => {
        console.error("댓글 등록 실패:", err);
        alert("댓글 등록에 실패했습니다.");
      });
  };

  // (옵션) 댓글 신고 / 수정 / 삭제는 구조만 잡고 alert 처리
  const handleReportComment = (commentNo) => {
    alert(`댓글 신고 기능은 추후 구현 예정입니다. (commentNo=${commentNo})`);
  };

  const handleEditComment = (commentNo) => {
    alert(`댓글 수정 기능은 추후 구현 예정입니다. (commentNo=${commentNo})`);
  };

  const handleDeleteComment = (commentNo) => {
    alert(`댓글 삭제 기능은 추후 구현 예정입니다. (commentNo=${commentNo})`);
  };



  // 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    axios
      .delete(`http://localhost:8081/boards/boards/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then(() => {
        alert("삭제되었습니다!");
        navi("/boards/boards");
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      });
  };

  //  수정 저장
  const handleUpdate = () => {
    if (!window.confirm("수정 내용을 저장할까요?")) return;

    axios
      .put(
        `http://localhost:8081/boards/boards/${id}`,
        {
          boardTitle: editTitle,
          boardContent: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((res) => {
        alert("수정되었습니다!");
        // 백엔드에서 수정된 객체를 돌려주면 그걸로 교체
        setBoard(res.data || { ...board, boardTitle: editTitle, boardContent: editContent });
        setEditMode(false);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  if (!board) return <div>잘못된 접근입니다. 관리자에게 문의하세요.</div>;

  console.log(" board.boardWriter =", board?.boardWriter);
  console.log(" auth =", auth);

  const isWriter = board.boardWriter === auth.userId; // 작성자 체크

  return (
    <Container>
      <Header>
        <img src={gasipan} alt="" style={{ width: "100%" }} />
        <div className="title-overlay">게시글 상세보기</div>
      </Header>

      {/*  읽기 모드 / 수정 모드 전환 */}
      {editMode ? (
        <>
          {/* 제목 수정 */}
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "18px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
          {/* 내용 수정 */}
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "200px",
              padding: "10px",
              fontSize: "16px",
              boxSizing: "border-box",
              marginTop: "10px",
              whiteSpace: "pre-wrap",
            }}
          />
        </>
      ) : (
        <>
          <Title>{board.boardTitle}</Title>
          <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
          <BoardContent>{board.boardContent}</BoardContent>
        </>
      )}

      {/* 작성자만 수정/삭제 가능 */}
            {isWriter && (
        <div style={{ marginTop: "10px" }}>
          {editMode ? (
            <>
              <Button onClick={handleUpdate}>저장</Button>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setEditTitle(board.boardTitle);
                  setEditContent(board.boardContent);
                }}
                style={{ background: "gray" }}
              >
                취소
              </Button>
              <Button onClick={handleDelete} style={{ background: "crimson" }}>
                삭제하기
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditMode(true)}>수정하기</Button>
              <Button onClick={handleDelete} style={{ background: "crimson" }}>
                삭제하기
              </Button>
            </>
          )}
        </div>
      )}

      <BottomArea>
        <TopButtonRow>
          <div>
            <Button onClick={() => navi("/boards/boards")}>목록보기</Button>
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() => alert("게시글 신고 기능은 추후 구현 예정입니다.")}
            >
              신고하기
            </Button>
          </div>

          {/* 오른쪽: 게시글 삭제/수정 버튼 (작성자에게만) */}
          {isWriter && (
            <div>
              <Button
                style={{ marginRight: "8px" }}
                onClick={handleDelete}
              >
                삭제
              </Button>
              <Button onClick={() => setEditMode(true)}>수정</Button>
            </div>
          )}
        </TopButtonRow>

        {/* 댓글 박스 */}
        <CommentArea>
          <CommentWriteTitle>댓글쓰기</CommentWriteTitle>

          {/* 로그인 여부에 따라 분기 */}
          {!isLoggedIn ? (
            <CommentDisabledBox
              onClick={() => {
                if (window.confirm("댓글 작성을 하시려면 로그인 해주세요.\n로그인 페이지로 이동할까요?")) {
                  navi("/members/login");
                }
              }}
            >
              댓글 작성 하시려면 로그인 해주세요. 로그인 하시겠습니까?
            </CommentDisabledBox>
          ) : (
            <>
              <CommentInput
                value={commentContent}
                placeholder="댓글을 작성해 주세요."
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <CommentWriteButtonRow>
                <Button onClick={handleInsertComment}>작성하기</Button>
              </CommentWriteButtonRow>
            </>
          )}

          {/* 댓글 리스트 */}
          <CommentTable>
            <thead>
              <tr>
                <CommentHeadCell style={{ width: "60px" }}>번호</CommentHeadCell>
                <CommentHeadCell style={{ width: "120px" }}>댓글작성자</CommentHeadCell>
                <CommentHeadCell>댓글 작성 내용</CommentHeadCell>
                <CommentHeadCell style={{ width: "120px" }}>작성일</CommentHeadCell>
                <CommentHeadCell style={{ width: "120px" }}></CommentHeadCell>
              </tr>
            </thead>
            <tbody>
              {comments.length === 0 ? (
                <tr>
                  <CommentCell colSpan={5}>등록된 댓글이 없습니다.</CommentCell>
                </tr>
              ) : (
                comments.map((comment, index) => {
                  const isCommentWriter = comment.commentWriter === auth.userId;
                  const rowNumber = comments.length - index; // 4,3,2,1 처럼 보이게

                  return (
                    <tr key={comment.commentNo || index}>
                      <CommentCell>{rowNumber}</CommentCell>
                      <CommentCell>{comment.commentWriter}</CommentCell>
                      <CommentCell>{comment.commentContent}</CommentCell>
                      <CommentCell>{comment.createDate}</CommentCell>
                      <CommentCell>
                        {isCommentWriter ? (
                          <>
                            <CommentActionButton
                              onClick={() => handleEditComment(comment.commentNo)}
                            >
                              수정
                            </CommentActionButton>
                            <CommentActionButton
                              onClick={() => handleDeleteComment(comment.commentNo)}
                            >
                              삭제
                            </CommentActionButton>
                          </>
                        ) : (
                          <CommentActionButton
                            onClick={() => handleReportComment(comment.commentNo)}
                          >
                            댓글신고
                          </CommentActionButton>
                        )}
                      </CommentCell>
                    </tr>
                  );
                })
              )}
            </tbody>
          </CommentTable>
        </CommentArea>
      </BottomArea>


      <Button onClick={() => navi(-1)} style={{ background: "blue", marginTop: "10px" }}>
        목록보기
      </Button>
    </Container>
  );


};

export default BoardDetail;
