import axios from "axios";
import {
  PageContainer,
  MainContainer,
  PageTitle,
  ReservationList,
  ReservationCard,
  CardContent,
  ImagePlaceholder,
  ReservationInfo,
  ReservationTitle,
  InfoList,
  InfoText,
  ButtonGroup,
  ReturnButton,
  ModifyButton,
  CancelButton
} from "../Cars/CarsReservationChange.style"
import SideBar from "../Common/Sidebar/Sidebar";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CarsReservationChange = () => {
  const [reservation, setReservation] = useState([]);
  const navi = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8081/cars/reserve/searchList",
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((result) => {
        console.log(result.data);
        setReservation(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.accessToken]);



  if (!auth.accessToken) return <div>빠이</div>;
  return (
    <>
      <SideBar />
      <MainContainer>
        <PageTitle>예약 내역</PageTitle>

        <ReservationList>
          {reservation.map((item) => (
            <ReservationCard key={item.reservation.reservationNo}>
            <CardContent>
              <ImagePlaceholder>
                {item.car?.carImage ? (
                  <img src={item.car?.carImage} alt="차량 이미지" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                ) : (
                  "이미지 없음"
                )}
              </ImagePlaceholder>

              <ReservationInfo>
                <InfoList>
                  <InfoText>이용 시간 : {item.reservation?.startTime} ~ {item.reservation.endTime}</InfoText>
                  <InfoText>예약번호 : {item.reservation?.reservationNo}</InfoText>
                  <InfoText>반납 위치 : {item.reservation?.destination}</InfoText>
                </InfoList>

                <ButtonGroup>
                  {item.reservation?.returnStatus === 'Y' ? (
                    <ReturnButton>반납하기</ReturnButton>
                  ) : (
                    <>
                      <ModifyButton>예약 변경 하기</ModifyButton>
                      <CancelButton>예약 취소 하기</CancelButton>
                    </>
                  )}
                </ButtonGroup>
              </ReservationInfo>
            </CardContent>
          </ReservationCard>
                  ))}
        </ReservationList>
      </MainContainer>
    </>
  );
}

export default CarsReservationChange;