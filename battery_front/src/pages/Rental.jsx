import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // 날짜 선택 컴포넌트를 가져옵니다.
import "react-datepicker/dist/react-datepicker.css"; // 스타일을 가져옵니다.
//import axios from "axios";
const BACKEND_URL = "127.0.0.1:8000";

const Container = styled.div`
  min-height: 844px;
  position: relative;
  text-align: center;
  background: linear-gradient(to bottom, #f4f8ff9c, #bad1ffba, #a6caff17);
  -ms-overflow-style: none;
  scrollbar-width: none;

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

const BackArrow = styled.div`
  height: 40px;
  width: 40px;
  object-fit: contain;
  position: absolute;
  left: 14px;
  top: 18px;
  background-image: url("${process.env.PUBLIC_URL}/images/BackArrow.svg");
  cursor: pointer; /* 마우스가 올라갔을 때 손가락 모양의 커서로 설정 */
`;

const Rectangle = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(217, 217, 217, 1);
  box-sizing: border-box;
  border-radius: 5px;
  width: 335px;
  height: 553px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const PushPin = styled.div`
  height: 60px;
  width: 60px;
  object-fit: contain;
  position: absolute;
  background-image: url("${process.env.PUBLIC_URL}/images/PushPin.svg");
  left: 320px;
  top: 100px;
  z-index: 2;
  border: none; /* 테두리 없애기 */
  outline: none;
  -webkit-tap-highlight-color: transparent; /* 추가된 부분 */
`;

const AaBattery = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: "Inter";
  font-weight: 800;
  font-size: 24px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  margin-bottom: 10px; /* 각 컨테이너 사이에 간격 추가 */
`;

const Line = styled.div`
  height: 2px;
  width: 280px;
  margin-bottom: 20px;
  background-image: url("${process.env.PUBLIC_URL}/images/Line.svg");
`;
const BoltBlack0 = styled.div`
  height: 20px;
  width: 20px;
  object-fit: contain;
  background-image: url("${process.env.PUBLIC_URL}/images/BoltBlack.svg");
  margin-right: 10px; /* 이미지와 텍스트 사이 간격 추가 */
  margin-bottom: 10px; /* 각 섹션 사이 간격 추가 */
`;

const BoltBlack1 = styled.div`
  height: 20px;
  width: 20px;
  object-fit: contain;
  background-image: url("${process.env.PUBLIC_URL}/images/BoltBlack.svg");
  margin-right: 10px; /* 이미지와 텍스트 사이 간격 추가 */
  margin-bottom: 10px; /* 각 섹션 사이 간격 추가 */
`;

const BoltBlack2 = styled.div`
  height: 20px;
  width: 20px;
  object-fit: contain;
  background-image: url("${process.env.PUBLIC_URL}/images/BoltBlack.svg");
  margin-right: 10px; /* 이미지와 텍스트 사이 간격 추가 */
  margin-bottom: 10px; /* 각 섹션 사이 간격 추가 */
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Price = styled.div`
  width: 52px;
  height: 24px;
  flex-shrink: 0;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const PriceNum = styled.div`
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
  left: 145px;
  top: 220px;
`;

const RentDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px; /* 간격 추가 */
`;

const RentDate = styled.div`
  width: 80px; /* 대여일자 텍스트 길이에 맞게 조절 */
  height: 24px;
  flex-shrink: 0;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const RentDateNum = styled.div`
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
  left: 110px;
  top: 300px;
`;
const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const QuantityInput = styled.div`
  display: flex;
  flex-shrink: 0;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const QuantityNum = styled.div`
  display: flex;
  position: relative;
  top: 20px;
  left: 10px;
`;

const TitleBox = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-family: Inter;
  font-weight: 1000;
  font-size: 20px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  position: absolute;
  left: 158px;
  top: 40px;
`;

const RentBtn = styled.div`
  width: 312px;
  height: 50px;
  flex-shrink: 0;
  background-image: url("${process.env.PUBLIC_URL}/images/RentBtn.svg");
  cursor: pointer;
`;

const AlignRow = styled.div`
  display: flex;
  align-items: row;
`;

const QuantityNumInput = styled.input`
  width: 50px; /* 적절한 너비로 조절하세요 */
  height: 24px;
  margin-top: 10px; /* 간격을 조절하세요 */
  padding: 5px;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const AlignRow2 = styled.div`
  display: flex;
  align-items: row;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const RentDateNumButton = styled.button`
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
  left: 110px;
  top: 300px;
  cursor: pointer;
`;

const RentDateColumn = styled.div`
  display: flex;
  align-items: column;
`;

const Rental = () => {
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜를 추적하는 상태

  const handleBackClick = () => {
    navigate("/Map");
  };

  const handleRentBtnClick = () => {
    setIsModalOpen(true);
    setConfirmationMessage("정말로 빌리시겠습니까?");
  };

  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
    setConfirmationMessage(""); // 모달 닫을 때 메시지 초기화
  };

  const handleYesButtonClick = () => {
    // "배터리를 빌렸습니다" 메시지 표시 후 모달 닫기
    setConfirmationMessage("배터리를 빌렸습니다.");
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmationMessage("");
    }, 2000); // 2초 후 모달 닫기 (예시로 추가한 부분, 실제로는 빌리기 동작 등을 여기서 처리하세요.)
  };

  return (
    <Container>
      <BackArrow onClick={handleBackClick}></BackArrow>
      <TitleBox> 대여하기 </TitleBox>
      <PushPin></PushPin>
      <Rectangle>
        <AaBattery>AA 알카라인 배터리</AaBattery>
        <Line></Line>

        <PriceContainer>
          <BoltBlack0></BoltBlack0>
          <Price>가격</Price>
          <PriceNum>3000원</PriceNum>
        </PriceContainer>
        <RentDateContainer>
          <BoltBlack1></BoltBlack1>
          <RentDateColumn>
            <RentDate>대여일자</RentDate>
            {/* RentDateNum을 버튼으로 대체 */}
            <RentDateNumButton
              onClick={() => setConfirmationMessage("날짜 선택")}
            >
              {selectedDate ? selectedDate.toDateString() : "날짜 선택"}
            </RentDateNumButton>
            {/* DatePicker 컴포넌트 사용 */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy년 MM월 dd일"
              withPortal
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                },
              }}
              popperPlacement="auto"
            />
          </RentDateColumn>
        </RentDateContainer>
        <QuantityContainer>
          <AlignRow>
            <BoltBlack2></BoltBlack2>
            <QuantityInput>대여 수량을 입력해주세요!</QuantityInput>
          </AlignRow>
          <AlignRow2>
            <QuantityNumInput
              type="text"
              placeholder="숫자"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <QuantityNum>개</QuantityNum>
          </AlignRow2>
        </QuantityContainer>

        <RentBtn onClick={handleRentBtnClick}></RentBtn>
      </Rectangle>
      {/* 모달 영역 */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <div>{confirmationMessage}</div>
            {confirmationMessage !== "배터리를 빌렸습니다." ? (
              // "배터리를 빌렸습니다"가 아닐 때만 예/아니오 버튼 표시
              <>
                <ModalButton onClick={handleYesButtonClick}>예</ModalButton>
                <ModalButton onClick={handleCloseButtonClick}>
                  아니오
                </ModalButton>
              </>
            ) : (
              // "배터리를 빌렸습니다"일 때 닫기 버튼 표시
              <ModalButton onClick={handleCloseButtonClick}>닫기</ModalButton>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Rental;
