import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
// import { Stcard } from '/StCard'

const Card = (post) => {

  console.log(post.image)
  const navigate = useNavigate()
  return (
    <Stcard>
      <StCardBox>
        <StImg src={`${post.image}`} alt="등록된 이미지가 없습니다." />
        <StLine />
        <StTextContainer>
          <Sttext fontSize='20px'>{post.title}</Sttext>
          <Sttext fontSize='14px'>{post.body}</Sttext>
          <Sttext fontSize='16px'>{post.star}점</Sttext>
        </StTextContainer>
      </StCardBox>
      <>
        <button onClick={() => navigate('/Detail')}>상세보기</button>
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

  gap:20px;

  width: 320px;
  height: 400px;

  box-shadow: 5px 5px 10px gray;
`;
const StImg = styled.img`
  width:95%;

  object-fit:scale-down;
`;
const StLine = styled.div`
  background: #00c473;

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

  width:95%;
`;
const Sttext = styled.span`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
`;
