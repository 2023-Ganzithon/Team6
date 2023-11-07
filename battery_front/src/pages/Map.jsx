import React from "react";
import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
const BACKEND_URL = "127.0.0.1:8000";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 844px;
  position: relative;
  text-align: center;
  background-color: #f5f5f5;
  overflow: hidden; /* 스크롤바 숨기기 */
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
const MapBox = styled.div`
  position: relative;
  margin: auto;
`;
const InfoText = styled.div`
  position: relative;
  margin: auto;
  top: 10px;
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
`;
const MypageBtn = styled.div`
  cursor: pointer;
  position: absolute;
  right: 17px;
  top: 15px;
`;

// 모달 애니메이션
const slideIn = keyframes`
0%{
  clip-path:polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  transform:translateY(100%);
}
95%{
  transform:translateY(0%);
}
100%{
  clip-path:polygon(0% 0%,100% 0%,100% 100%, 0% 100%);
}
`;
// 팝업창
const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  margin: auto;
  position: absolute;
  z-index: 999;
  top: 673px;
  width: 100%;
  height: 170px;
  border-radius: 25px 25px 0px 0px;
  background: #6b90f0;
  animation: ${(props) =>
    props.open
      ? css`
          ${slideIn} 0.5s ease-in-out
        `
      : ""};
`;
const PopupBox = styled.div`
  position: relative;
  margin: auto;
  width: 350px;
  height: 170px;
`;
const LocImg = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  background-image: url("${process.env.PUBLIC_URL}/images/location_red.svg");
  background-size: cover;
  background-position: center;
  top: 20px;
`;
const LocText = styled.div`
  position: relative;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 32px;
  text-align: left;
`;

const Remaining = styled.div`
  position: relative;
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  right: 30px;
  top: 20px;
`;
const GoRentalBtn = styled.button`
  position: relative;
  width: 111px;
  height: 30px;
  background-image: url("${process.env.PUBLIC_URL}/images/rentalbutton.svg");
  background-size: cover;
  background-position: center;
  border: none;
  margin-top: 50px;
  margin-left: 245px;
`;

const { kakao } = window;

const Map = () => {
  const navigate = useNavigate();
  const goMyPage = () => {
    navigate("/MyPage");
  };
  const goRental = () => {
    // 대여 장소 같이 보내야 함
    navigate("/Rental");
  };
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const [selectedMarkerTitle, setSelectedMarkerTitle] = useState("");
  const [remaining, setRemaining] = useState("");

  // 카카오맵 띄우기
  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.40238933620983, 127.10118541040657), // 지도 중심좌표(판교 디지털센터)
      level: 4,
    };
    var map = new kakao.maps.Map(container, options);

    // 마커 생성
    var markerPosition = new kakao.maps.LatLng(
      37.401121424252246,
      127.10347075711505
    );
    var markerPosition2 = new kakao.maps.LatLng(
      37.4033458356304,
      127.0995151230583
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    var marker2 = new kakao.maps.Marker({
      position: markerPosition2,
    });
    marker.setMap(map);
    marker2.setMap(map);

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, "click", () => {
      setModalOpen(true);
      setSelectedMarkerTitle("GS25 판교GB점");
      setRemaining("30");
    });

    kakao.maps.event.addListener(marker2, "click", () => {
      setModalOpen(true);
      setSelectedMarkerTitle("장소2");
      setRemaining("20");
    });

    kakao.maps.event.addListener(map, "click", () => {
      closeModal();
    });
  }, []);

  return (
    <Container>
      <InfoText>대여 가능 지역을 확인하세요!</InfoText>
      <MypageBtn onClick={goMyPage}>
        <img
          src={`${process.env.PUBLIC_URL}/images/mypagebtn.svg`}
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </MypageBtn>
      <MapBox id="map" style={{ width: "370px", height: "760px" }}></MapBox>
      {/* 모달 */}
      <Modal open={modalOpen}>
        <PopupBox>
          <LocImg></LocImg>
          <LocText>{selectedMarkerTitle}</LocText>
          <Remaining>충전식 배터리 잔여 수량: {remaining}개</Remaining>
          <GoRentalBtn onClick={goRental}></GoRentalBtn>
        </PopupBox>
      </Modal>
    </Container>
  );
};

export default Map;
