import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
const BACKEND_URL = "127.0.0.1:8000";

const Container = styled.div`
  min-height: 844px;
  position: relative;
  text-align: center;
  background: rgba(216, 232, 255, 0.56);
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex-direction: column;

  /* 미디어 쿼리 적용 */
  /* pc 화면에서 너비를 390으로 고정합니다 */
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Rectangle1 = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 25px 25px;
  width: 390px;
  height: 272px;
  position: absolute;
  left: 0px;
  top: -1px;
`;

const BackArrow = styled.div`
  height: 40px;
  width: 40px;
  objectfit: contain;
  position: absolute;
  left: 14px;
  top: 18px;
  background-image: url("${process.env.PUBLIC_URL}/images/BackArrow.svg");
  cursor: pointer; /* 마우스가 올라갔을 때 손가락 모양의 커서로 설정 */
`;

const NameHiRow = styled.div`
  display: flex;
  align-items: row;
`;

const NameHiValue = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: "Inter";
  font-weight: 400;
  font-size: 19px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 40px;
  top: 70px;
`;

const NameValue = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: "Inter";
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 130px;
  top: 183px;
`;

const NameHi = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: "Inter";
  font-weight: 400;
  font-size: 19px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 100px;
  top: 70px;
`;

const MyInfo = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: "Inter";
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 32px;
  top: 127px;
`;

const Line1 = styled.img`
  height: 2px;
  width: 320px;
  position: absolute;
  left: 34px;
  top: 159px;
  background-image: url("${process.env.PUBLIC_URL}/images/Line.svg");
`;

const Name = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 36px;
  top: 185px;
`;

const EmailRow = styled.div`
  display: flex;
  align-items: row;
`;

const EmailValue = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 135px;
  top: 222px;
`;

const Email = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 35px;
  top: 222px;
`;

const Battery = styled.div`
  height: 25px;
  width: 25px;
  object-fit: contain;
  position: absolute;
  left: 35px;
  top: 300px; /* Rectangle1의 height에 맞춰 조절 */
  background-image: url("${process.env.PUBLIC_URL}/images/battery.svg");
`;

const CurrentRental = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 60px;
  top: 300px; /* Rectangle1의 height에 맞춰 조절 */
`;

const Line2 = styled.img`
  height: 2px;
  width: 320px;
  position: absolute;
  left: 35px;
  top: 330px;
  background-image: url("${process.env.PUBLIC_URL}/images/Line.svg");
`;

const Rectangle2 = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 341px;
  height: 188px;
  position: absolute;
  left: 24px;
  top: 350px;
`;

const Rental = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
`;

const Place = styled(Rental)`
  left: 45px;
  top: 40px;
`;

const Term = styled(Rental)`
  left: 45px;
  top: 80px;
`;

const Quantity = styled(Rental)`
  left: 45px;
  top: 120px;
`;

const Rectangle3 = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 341px;
  height: 188px;
  position: absolute;
  left: 24px;
  top: 570px;
`;

const Rental1 = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
`;

const Place1 = styled(Rental1)`
  left: 45px;
  top: 40px;
`;

const Term1 = styled(Rental1)`
  left: 45px;
  top: 80px;
`;

const Quantity1 = styled(Rental1)`
  left: 45px;
  top: 120px;
`;

const LogOut = styled.div`
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 77px;
  height: 28px;
  left: 280px;
  top: 240px;
  text-align: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
`;

const Smile = styled.div`
  background-image: url("${process.env.PUBLIC_URL}/images/smile.svg");
  display: flex;
  position: absolute;
  isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  left: 277px;
  top: 46px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;

const ReturnBtn = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding: 0px;
  box-sizing: border-box;
  width: 100px;
  height: 28px;
  left: 220px;
  top: 150px;
  background-color: #c4c2c2;
  cursor: pointer;
`;

const ReturnBtn1 = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding: 0px;
  box-sizing: border-box;
  width: 100px;
  height: 28px;
  left: 220px;
  top: 150px;
  background-color: #c4c2c2;
  cursor: pointer;
`;
// 사

const locationRed = styled.div`
  background-image: url("${process.env.PUBLIC_URL}/images/locationRed.svg");
  height: 20px;
  width: 20px;
  object-fit: contain;
  position: absolute;
  left: 126px;
  top: 200px;
`;

const PlaceRow0 = styled.div`
  display: flex;
  align-items: row;
`;

const TermRow0 = styled.div`
  display: flex;
  align-items: row;
`;

const QuantityRow0 = styled.div`
  display: flex;
  align-items: row;
`;

const PlaceValue = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 152px;
  top: 40px;
`;

const TermValue = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 152px;
  top: 80px;
`;

const QuantityValue = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 152px;
  top: 120px;
`;

const PlaceRow1 = styled.div`
  display: flex;
  align-items: row;
`;

const TermRow1 = styled.div`
  display: flex;
  align-items: row;
`;

const QuantityRow1 = styled.div`
  display: flex;
  align-items: row;
`;

const PlaceValue1 = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 152px;
  top: 40px;
`;

const TermValue1 = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 152px;
  top: 80px;
`;

const QuantityValue1 = styled.div`
  text-align: center;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 152px;
  top: 120px;
`;

const MyPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleReturnBtnClick = () => {
    setShowModal(true);
  };

  const handleReturnBtn1Click = () => {
    setShowModal(true);
  };

  const handleYesClick = () => {
    // 예 버튼을 눌렀을 때의 동작
    setShowModal(false);
  };

  const handleNoClick = () => {
    // 아니오 버튼을 눌렀을 때의 동작
    setShowModal(false);
  };

  const handleBackClick2 = () => {
    navigate("/Map");
  };

  const handleLogOutClick = () => {
    navigate("/");
  };
  return (
    <Container>
      <Rectangle1>
        <Smile></Smile>
        <BackArrow onClick={handleBackClick2}></BackArrow>
        <NameHiRow>
          <NameHiValue>손오공</NameHiValue>
          <NameHi>님, 안녕하세요</NameHi>
        </NameHiRow>

        <MyInfo>내 정보</MyInfo>
        <Line1></Line1>
        <NameHiRow>
          <Name>이름</Name>
          <NameValue>손오공</NameValue>
        </NameHiRow>

        <EmailRow>
          <Email>이메일</Email>
          <EmailValue>xxx@likelion.org</EmailValue>
        </EmailRow>
      </Rectangle1>
      <Battery></Battery>
      <CurrentRental>나의 대여 현황</CurrentRental>
      <Line2></Line2>
      <Rectangle2>
        <PlaceRow0>
          <Place>대여 위치</Place>
          <locationRed></locationRed>
          <PlaceValue>GS25 판교역점</PlaceValue>
        </PlaceRow0>
        <TermRow0>
          <Term>대여 기간</Term>
          <TermValue>2023/11/04-현재</TermValue>
        </TermRow0>
        <QuantityRow0>
          <Quantity>대여 수량</Quantity>
          <QuantityValue>5개</QuantityValue>
        </QuantityRow0>

        <ReturnBtn onClick={handleReturnBtnClick}>반납하기</ReturnBtn>
      </Rectangle2>
      <Rectangle3>
        <PlaceRow1>
          <Place1>대여 위치</Place1>
          <PlaceValue1>구름</PlaceValue1>
        </PlaceRow1>
        <TermRow1>
          <Term1>대여 기간</Term1>
          <TermValue1>2023/11/11-현재</TermValue1>
        </TermRow1>
        <QuantityRow1>
          <Quantity1>대여 수량</Quantity1>
          <QuantityValue1>5개</QuantityValue1>
        </QuantityRow1>

        <ReturnBtn1 onClick={handleReturnBtn1Click}>반납하기</ReturnBtn1>
        <LogOut onClick={handleLogOutClick}>로그아웃</LogOut>
      </Rectangle3>

      {showModal && (
        <ModalBackground>
          <ModalContent>
            <p>정말 반납하시겠습니까?</p>
            <ButtonContainer>
              <Button onClick={handleYesClick}>예</Button>
              <Button onClick={handleNoClick}>아니오</Button>
            </ButtonContainer>
          </ModalContent>
        </ModalBackground>
      )}
    </Container>
  );
};

export default MyPage;
