import { StyledHeader, Logo, Frame, NavItem, ButtonWrapper, ButtonText, ButtonText2, IconLogo } from "./Header.styles";
import logo from "../../../assets/HeaderLogo.png";

const Header = () => {
  return (
    <>
    <StyledHeader>
      <IconLogo>
      <Logo src={logo} alt="로고없음" />
      </IconLogo>
      <Frame>
        <NavItem href="/cars/searchList">차량찾기</NavItem>
        <NavItem href="/stations">충전소</NavItem>
        <NavItem href="/boards">커뮤니티</NavItem>
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