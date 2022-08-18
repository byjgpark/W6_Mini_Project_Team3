import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import logo from "../../logo.png"

const Card = (post) => {
  const navigate = useNavigate();
  const star = useSelector(state => state.list.postList)
  const handleImgError = (e) => {
    e.target.src = logo;
  }
  
  return (
    <Stcard  onClick={() => navigate(`/Detail/${post.id}`)}>
      <StCardBox>
        <StImg src={`${post.image}`} alt="등록된 이미지가 없습니다." onError={handleImgError}/>
        <StLine />
        <StTextContainer>
          <Sttext fontSize='20px' fontWeight='700'>{post.title}</Sttext>
          <Sttext fontSize='14px'>{`#${post.place}`}</Sttext>
          <Sttext fontSize='14px' color='#666'>{post.body}</Sttext>
          <Sttext fontSize='20px'>
            <div>
              {[...Array(parseInt(post.star))].map((star,i) => {
                return (
                  <FaStar key={i} style={{ color:'#fcbe32' }}/>
                );
              })}
            </div>
          </Sttext>
        </StTextContainer>
      </StCardBox>
        {/* <StButton onClick={() => navigate(`/Detail/${post.id}`)}>상세보기</StButton> */}
    </Stcard>
  );
};

export default Card;

const Stcard = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  gap:15px;

  width: 320px;
  height: 400px;

  background-color:#fff;
  box-shadow: 5px 5px 10px gray;

  cursor: pointer;

  transition: all 200ms;
  :hover{
    z-index:1;
    transform:scale(1.15);
  }
`;
const StImg = styled.img`
  width:95%;
  height:180px;

  object-fit:cover;
`;
const StLine = styled.div`
  background: #fcbe32;

  width:100%;
  height:3px;
`;
const StCardBox = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  gap:20px;

  width:90%;
  /* height:80%; */
`;
const StTextContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 15px;

  width:100%;

  margin-left:5%;
`;
const Sttext = styled.span`
  font-size: ${props => props.fontSize};
  font-weight:  ${props => props.fontWeight};
  color: ${props => props.color};

  width:100%;
  
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
`;