import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  min-height: 844px;
  position: relative;
  text-align: center;
  background: #5c89ff;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* 미디어 쿼리 적용 */
  /* pc화면에서 너비를 390로 고정합니다*/
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const LogoImg = styled.div`
  position: relative;
  top: 200px;
  margin: auto;
  width: 90px;
  height: 90px;
  border: none;
  background-image: url("${process.env.PUBLIC_URL}/images/bolt.svg");
  background-size: cover;
  background-position: center;
`;

const TitleBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 220px;
  color: #fff;
  font-family: Inter;
  font-size: 39px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const SubTitleBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 18px;
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const LoginBtn = styled.div`
  position: relative;
  margin: auto;
  margin-top: 200px;
  width: 320px;
  height: 56px;
  border: none;
  background-image: url("${process.env.PUBLIC_URL}/images/loginbtn.svg");
  background-size: cover;
  background-position: center;
`;
const SignupBtn = styled.div`
  position: relative;
  margin: auto;
  margin-top: 5px;
  width: 320px;
  height: 56px;
  border: none;
  background-image: url("${process.env.PUBLIC_URL}/images/signupbtn.svg");
  background-size: cover;
  background-position: center;
`;
const KakaoBtn = styled.div`
  position: relative;
  margin: auto;
  margin-top: 5px;
  width: 320px;
  height: 56px;
  border: none;
  background-image: url("${process.env.PUBLIC_URL}/images/kakaobtn.svg");
  background-size: cover;
  background-position: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/LoginPage");
  };
  const goSignup = () => {
    navigate("/SignUpPage");
  };

  return (
    <Container>
      <LogoImg></LogoImg>
      <TitleBox>길건너건전지</TitleBox>
      <SubTitleBox>충전식 배터리 대여 서비스</SubTitleBox>
      <LoginBtn onClick={goLogin}></LoginBtn>
      <SignupBtn onClick={goSignup}></SignupBtn>
      <Link to="https://accounts.kakao.com/login/?continue=https%3A%2F%2Fdevelopers.kakao.com%2Flogin%3Fcontinue%3Dhttps%253A%252F%252Fdevelopers.kakao.com%252Fdocs%252Flatest%252Fko%252Fkakaologin%252Fcommon&lang=ko#login">
        <KakaoBtn></KakaoBtn>
      </Link>
    </Container>
  );
};

export default Home;
