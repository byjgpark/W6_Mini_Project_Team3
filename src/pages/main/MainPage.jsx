import React from 'react';
import { useNavigate }from 'react-router-dom'
import styled from 'styled-components';
import TitleButton from '../../component/titleButton/TitleButton';
import img from "../../img/MainImg.jpeg"

// redux
import {userStatus} from "../../redux/modules/user"
import { useSelector, useDispatch } from "react-redux";

const MainPage = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  console.log("This is user check in main page "+ JSON.stringify(users.users.userStatus))

  return (
    <div style={{ width: '1200px', minHeight:'100vh',display: 'flex', flexDirection: 'column', margin: '0 auto', padding:'10px 30px',
    //  backgroundColor:'#ff5f2e30',
     }}>
      <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
      <TitleButton />
      <StAddBtn onClick={() => navigate('/add')}>✏️</StAddBtn>
      </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', padding:'30px 30px',gap:'30px', height:'100vh'
          // , backgroundColor:'#ff5f2e20'
        }}>
            <div>
              <img src={img} alt='이미지를 찾을 수 없습니다.' style={{ width: '600px', height: '550px', objectFit: 'cover', borderRadius:'5%' }} />
            </div>
            <StDescBox style={{ width:'400px' }}>
              <StDesc>여행하GO</StDesc>
              <StDesc>추천하GO</StDesc>
              <StDesc>가보자GO</StDesc>
            </StDescBox>
            {!users.users.userStatus ?
            <StBtnBox>
              <StBtn onClick={() => navigate('/login')}>로그인</StBtn>
              <StBtn onClick={() => navigate('/cards')}>전체보기</StBtn>
              <StBtn onClick={() => navigate('/cards/10')}>10대</StBtn>
              <StBtn onClick={() => navigate('/cards/20')}>20대</StBtn>
              <StBtn onClick={() => navigate('/cards/30')}>30대</StBtn>
            </StBtnBox>
            :
            <StBtnBox>
              <StBtn onClick={() => navigate('/login')}>로그아웃</StBtn>
              <StBtn onClick={() => navigate('/cards')}>전체보기</StBtn>
              <StBtn onClick={() => navigate('/cards/10')}>10대</StBtn>
              <StBtn onClick={() => navigate('/cards/20')}>20대</StBtn>
              <StBtn onClick={() => navigate('/cards/30')}>30대</StBtn>
            </StBtnBox>
            }       
          </div>
        </div>
    </div>
  );
};

export default MainPage;

const StDescBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  gap:10px;

  width:400px;
  height:550px;
`;
const StDesc = styled.span`
  color: #ff5f2e;
  font-size: 100px;
  font-weight: 700;
  font-style:italic;
  font-family: 'Do Hyeon', sans-serif;
  text-align: center;
  text-shadow: 7px 7px 5px #fcbe32;

  transform:scaleY(1.2)
`;
const StBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  gap:50px;
  
  width:140px;
  height:550px;

  /* margin-top:50px; */

  background-color:#ff5f2e80;
  border-radius:20px;
  `;
const StBtn = styled.button`
  width:100px;
  height:40px;

  font-size: 20px;
  font-weight: 700;

  color:#fff;
  background-color:initial;
  border:none;
  
  cursor: pointer;

  transition: all 200ms;
  :hover{
    transform:scale(1.3);
    background-color:initial;
    /* border:2px solid #fff; */
    /* border-radius: 5px; */
  }
`;
const StAddBtn = styled.button`
  width:100px;
  height:80px;

  font-size: 50px;
  font-weight: 700;

  color:#fff;
  background-color:initial;
  border:none;

  margin-right:30px;
  
  cursor: pointer;
  transition: all 200ms;
  :hover{
    transform:scale(1.2);
    background-color:initial;
  }
`;