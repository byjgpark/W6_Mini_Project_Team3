import React from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import logo from '../../logo.png'
const TitleButton = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* <StImg src={logo} onClick={() => navigate('/')}/> */}
      <StAaa onClick={() => navigate('/')} >YOLO GO</StAaa>
    </div>
  );
};

export default TitleButton;

const StImg = styled.img`
  width:80px;
  height:80px;
  margin-left:62px;

  margin:20px auto;
`;
const StAaa = styled.div`
  background: linear-gradient(to right, #ffa3a1, #a62efd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  width:205px;

  font-size:50px;
  font-weight:800;
  letter-spacing:2px;

  padding:15px 30px;

  font-family: 'Lobster', cursive;
  `;
