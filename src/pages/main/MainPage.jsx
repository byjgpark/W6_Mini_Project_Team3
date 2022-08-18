import React from 'react';
import { useNavigate }from 'react-router-dom'
import styled from 'styled-components';
import TitleButton from '../../component/titleButton/TitleButton';
import { FaPencilAlt } from "react-icons/fa";
import mainimage from '../../mainimage.jpg'

const MainPage = () => {
  const navigate = useNavigate()
  const getToken = localStorage.getItem("SavedToken");
  console.log(getToken)

  return (
    <Container>
      <HederContainer>
      <TitleButton />
        { getToken ? 
        <FaPencilAlt className='addBtn' onClick={() => navigate('/add')}></FaPencilAlt> :
        <FaPencilAlt className='addBtn' onClick={() => alert('먼저 로그인 해주세요!')}>✏️</FaPencilAlt> }
      </HederContainer>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', padding:'10px 30px',gap:'20px', height:'100vh'
        // , backgroundColor:'#ff5f2e20'
      }}>
          <div>
            <img src={mainimage} alt='메인 이미지' style={{ width: '600px', height: '550px', objectFit: 'cover', borderRadius:'5%' }} />
          </div>
          <StDescBox>
            <StDesc>여행하GO</StDesc>
            <StDesc>추천하GO</StDesc>
            <StDesc>가보자GO</StDesc>
          </StDescBox>
          <StBtnBox>
            {
            getToken ? 
            <StBtn onClick={() => {window.location.reload(); localStorage.removeItem("SavedToken");}}>로그아웃</StBtn> :
            <StBtn onClick={() => navigate('/login')}>로그인</StBtn>
            }
            <StBtn onClick={() => navigate('/signup')}>회원가입</StBtn>
            <StBtn onClick={() => navigate('/cards')}>전체보기</StBtn>
            <StBtn onClick={() => navigate('/cards/10')}>10대</StBtn>
            <StBtn onClick={() => navigate('/cards/20')}>20대</StBtn>
            <StBtn onClick={() => navigate('/cards/30')}>30대</StBtn>
          </StBtnBox>
        </div>
      </div>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 1200px;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding:10px 30px;
`;
const HederContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between ;
  padding:10px 30px;

  .addBtn {
  width:50;
  height:50px;

  font-size: 50px;
  font-weight: 700;

  color:#ff5f2e;
  background-color:initial;
  border:none;

  margin: 20px 40px 0 0;
  
  cursor: pointer;
  transition: all 200ms;
}
.addBtn:hover{
  transform:scale(1.2);
  background-color:initial;
};
`;
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
  
  width:150px;
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
/* const StAddBtn = styled.div`
  width:100px;
  height:80px;

  font-size: 50px;
  font-weight: 700;

  color:#fff;
  background-color:initial;
  border:none;

  margin:10px 40px 0 0;
  
  cursor: pointer;
  transition: all 200ms;
  :hover{
    transform:scale(1.2);
    background-color:initial;
  }
`; */
