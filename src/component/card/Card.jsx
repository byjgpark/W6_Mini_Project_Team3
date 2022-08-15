import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Card = (post) => {
  const navigate = useNavigate()
  const star = useSelector(state => state.list.postList)
  console.log(star)
  console.log(post.star)
  // const numStar = parseInt(post.star)
  // console.log(numStar)
  
  return (
    <Stcard>
      <StCardBox>
        <StImg src={`${post.image}`} alt="등록된 이미지가 없습니다." />
        <StLine />
        <StTextContainer>
          <Sttext fontSize='20px' fontWeight='700'>{post.title}</Sttext>
          <Sttext fontSize='14px'>{`#${post.place}`}</Sttext>
          <Sttext fontSize='14px'>{post.body}</Sttext>
          <Sttext fontSize='20px'>
            <div>
              {[...Array(parseInt(post.star))].map(star => {
                return (
                  <FaStar style={{ color:'#fcbe32' }}/>
                );
              })}
            </div>
          </Sttext>
        </StTextContainer>
      </StCardBox>
      <>
        <StButton onClick={() => navigate(`/Detail/${post.id}`)}>상세보기</StButton>
      </>
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

  box-shadow: 5px 5px 10px gray;
`;
const StImg = styled.img`
  width:95%;
  max-height:180px;
  min-height:160px;

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
  gap: 10px;

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
const StButton = styled.button`
  width:100px;
  height:30px;

  color:#e1eef6;
  background-color:#ff5f2e;

  font-weight:700;

  border:none;
  border-radius:7px;

  margin-left:55%;
  `