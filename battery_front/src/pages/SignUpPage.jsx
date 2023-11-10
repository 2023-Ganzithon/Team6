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
  color: #5c89ff;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const SignupBtn = styled.div`
  position: relative;
  margin: auto;
  margin-top: 250px;
  width: 312px;
  height: 50px;
  border: none;
  background-image: url("${process.env.PUBLIC_URL}/images/signupbtn2.svg");
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
const NoticeText = styled.div`
  position: absolute;
  margin-top: 3px;
  width: 200px;
  color: #ff0404;
  text-align: left;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      //이메일 중복체크 get
      const getResponse = await axios.get(`${BACKEND_URL}`);
      const users = getResponse.data;
      console.log(users);
      if (users.find((user) => user.email === email)) {
        alert("이미 있는 계정입니다.");
        return;
      }
      // 회원가입
      const response = await axios.post(`${BACKEND_URL}`, {
        id: id,
        password: password,
        email: email,
        name: name,
      });
      console.log("회원가입 요청 성공:", response); // 테스트

      if (!response.data) {
        alert("등록에 실패했습니다");
        throw new Error();
      }
      navigate("/LoginPage");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  // 입력 데이터 state 담기
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
    passwdCheck: "",
  });
  // 입력값 바뀔 때마다 저장
  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const { name, email, id, password, passwdCheck } = userData;
  // 유효성 검사
  const isSame = password === passwdCheck; // 이메일 패스워드 일치 확인
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const checkForm = () => {
    if (name === "") return alert("이름을 입력해주세요.");
    else if (id === "") return alert("아이디를 입력해주세요");
    else if (email === "" || !isEmailValid(email))
      return alert("이메일을 확인해주세요.");
    else if (password === "") return alert("비밀번호를 확인해주세요.");
    else if (passwdCheck === "" || isSame === false)
      return alert("비밀번호가 동일한지 확인해주세요.");
    else onSubmit();
  };

  return (
    <Container>
      <Box>
        <TitleBox>회원가입</TitleBox>
        <SubTitleBox>회원가입 정보를 입력하세요</SubTitleBox>

        <InputBox
          name="name"
          value={name}
          onChange={handleInput}
          placeholder="이름"
        ></InputBox>
        <InputBox
          placeholder="이메일 주소"
          name="email"
          value={email}
          onChange={handleInput}
        ></InputBox>
        {!isEmailValid(email) && email !== "" && (
          <NoticeText>올바른 이메일 형식이 아닙니다.</NoticeText>
        )}
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
        <InputBox
          name="passwdCheck"
          type="password"
          value={passwdCheck}
          onChange={handleInput}
          placeholder="비밀번호 확인"
        ></InputBox>
        {passwdCheck !== "" && !isSame && (
          <NoticeText>비밀번호가 다릅니다.</NoticeText>
        )}
      </Box>
      <SignupBtn onClick={checkForm}></SignupBtn>
    </Container>
  );
};

export default SignUpPage;
