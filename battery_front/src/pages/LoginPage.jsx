import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = "127.0.0.1:8000";

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  min-height: 844px;
  position: relative;
  text-align: center;
  background: white;
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

const TitleBox = styled.div`
  position: relative;
  margin: auto;
  top: 35px;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const SubTitleBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 95px;
  margin-bottom: 40px;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const LoginBtn = styled.div`
  position: relative;
  margin: auto;
  margin-top: 440px;
  width: 312px;
  height: 50px;
  border: none;
  background-image: url("${process.env.PUBLIC_URL}/images/loginbtn2.svg");
  background-size: cover;
  background-position: center;
`;

const InputBox = styled.input`
  position: relative;
  display: block;
  margin: auto;
  margin-top: 20px;
  width: 287px;
  height: 39px;
  border-radius: 10px;
  border: 1px solid #a3a3a3;
  padding-left: 15px;
  background: #fff;
  &::placeholder {
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Box = styled.div`
  position: relative;
  margin: auto;
  width: 300px;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const gotoMap = () => {
    navigate("/Map");
  };

  const onSubmit = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}`);
      const users = response.data;

      let isLoginSuccess = false; // 로그인 성공 여부를 나타내는 변수
      let isLoginFailed = false;

      users.forEach((user) => {
        if (user.id === id) {
          if (user.password === password) {
            //handleSetUserInfo(user.name, user.id);
            alert("로그인되었습니다.");

            isLoginSuccess = true; // 로그인 성공으로 플래그 설정
            isLoginFailed = false;
            //handleLogin();
            gotoMap();
          } else {
            alert("비밀번호가 틀렸습니다.");
            isLoginFailed = true;
          }
        }
      });
      // 사용자 정보를 찾지 못한 경우 로그인 실패 처리
      if (!isLoginSuccess && !isLoginFailed) {
        alert("회원 정보가 없습니다.");
      }
    } catch (error) {
      // 로그인 오류 처리
      alert("로그인 실패: " + error.response.data.message);
    }
  };

  // 입력 데이터 state 담기
  const [userData, setUserData] = useState({
    id: "",
    password: "",
  });

  // 입력값 바뀔 때마다 저장
  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const { id, password } = userData;

  return (
    <Container>
      <Box>
        <TitleBox>로그인</TitleBox>
        <SubTitleBox>로그인 정보를 입력하세요</SubTitleBox>

        <InputBox
          name="id"
          value={id}
          onChange={handleInput}
          placeholder="아이디"
        ></InputBox>
        <InputBox
          name="password"
          value={password}
          onChange={handleInput}
          placeholder="비밀번호"
        ></InputBox>
      </Box>
      <LoginBtn onClick={onSubmit}></LoginBtn>
    </Container>
  );
};

export default LoginPage;
