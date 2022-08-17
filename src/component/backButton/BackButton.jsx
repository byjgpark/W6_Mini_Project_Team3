import React from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <>
      <StButton onClick={() => navigate(-1)}>←</StButton>
    </>
  );
};

export default BackButton;

const StButton = styled.button`
  font-size: 50px;

  background:transparent;

  border:none;

  cursor: pointer;
`