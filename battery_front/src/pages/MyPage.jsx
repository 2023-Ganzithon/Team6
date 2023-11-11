import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  position: relative;
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
  top: 300px;
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
  position: relative;
  margin: auto;
  margin-bottom: 30px;
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
  top: 20px;
`;

const Term = styled(Rental)`
  left: 45px;
  top: 60px;
`;

const Quantity = styled(Rental)`
  left: 45px;
  top: 100px;
`;
const Price = styled(Rental)`
  left: 45px;
  top: 135px;
`;

const LogOut = styled.div`
  display: flex;
  position: relative;
  // isolation: isolate;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  box-sizing: border-box;
  width: 77px;
  height: 28px;
  left: 280px;
  margin-top: 40px;
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
const PriceRow0 = styled.div`
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
  top: 20px;
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
  top: 60px;
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
  top: 100px;
`;
const PriceValue = styled.div`
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
  top: 135px;
`;

const BoxList = styled.div`
  position: relative;
  margin: auto;
  width: 360px;
  margin-top: 70px;
  height: 400px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyPage = () => {
  const [showModal, setShowModal] = useState(false);

  // 연동
  // const { username } = localStorage.getItem("username");
  // const { useremail } = localStorage.getItem("useremail");
  const [rentalList, setRentalList] = useState([3]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // API 호출
  //       const response = await axios.post(
  //         `/api/${BACKEND_URL}/mypage/rental-info`,
  //         {
  //           name: username,
  //           email: useremail,
  //         }
  //       );
  //       setRentalList(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const navigate = useNavigate();

  const handleReturnBtnClick = () => {
    setShowModal(true);
  };
  const handleYesClick = () => {
    // 예 버튼을 눌렀을 때
    setShowModal(false);
  };
  const handleNoClick = () => {
    // 아니오 버튼을 눌렀을 때
    setShowModal(false);
  };
  const handleBackClick2 = () => {
    navigate("/Map");
  };
  const handleLogOutClick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    navigate("/");
  };
  return (
    <Container>
      <Rectangle1>
        <Smile></Smile>
        <BackArrow onClick={handleBackClick2}></BackArrow>
        <NameHiRow>
          <NameHiValue>손오공</NameHiValue> {/* username */}
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
          <EmailValue>xxx@likelion.org</EmailValue> {/*{useremail} */}
        </EmailRow>
      </Rectangle1>
      <Battery></Battery>
      <CurrentRental>나의 대여 현황</CurrentRental>
      <Line2></Line2>
      {/* 추가 */}
      <BoxList>
        {rentalList.map((e) => (
          <Rectangle2 key={e.id}>
            <PlaceRow0>
              <Place>대여 위치</Place>
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
            <PriceRow0>
              <Price>가격</Price>
              <PriceValue>5000원</PriceValue>
            </PriceRow0>
            <ReturnBtn onClick={handleReturnBtnClick}>반납하기</ReturnBtn>
          </Rectangle2>
        ))}
      </BoxList>
      {/* 반납하기 모달 */}
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
      <LogOut onClick={handleLogOutClick}>로그아웃</LogOut>
    </Container>
  );
};

export default MyPage;
