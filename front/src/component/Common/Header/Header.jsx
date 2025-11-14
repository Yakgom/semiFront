import { StyledHeader, Logo, Frame, NavItem, ButtonWrapper, ButtonText, ButtonText2, IconLogo } from "./Header.styles";
import logo from "../../../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";
import Board from "../../Boards/Board/Board";

const Header = () => {
  const navi = useNavigate();
  return (
    <>
    <StyledHeader>
      <IconLogo>
        <a href="/">
          <Logo src={logo} alt="로고없음" />
        </a>
      </IconLogo>
      <Frame>
        <NavItem href="/cars/searchList">차량찾기</NavItem>
        <NavItem href="/stations">충전소</NavItem>
        <NavItem onClick={() =>navi("/boards")}>커뮤니티</NavItem>
        <ButtonWrapper>
          <ButtonText href="/members/join">로그인</ButtonText>
          <ButtonText2>/</ButtonText2>
          <ButtonText href="/members/login">회원가입</ButtonText>
        </ButtonWrapper>
      </Frame>
    </StyledHeader>
    </>
  );
};

export default Header;