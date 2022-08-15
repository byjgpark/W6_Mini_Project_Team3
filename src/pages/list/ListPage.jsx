import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../component/backButton/BackButton";
import Card from "../../component/card/Card";
import TitleButton from "../../component/titleButton/TitleButton";
import { _getPost } from "../../redux/modules/list";

const ListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postList = useSelector((state) => state.list.postList);
  console.log(postList);

  useEffect(() => {
    dispatch(_getPost());
  }, []);

  return (
    <StListContainer>
      <StButtonContainer>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        <TitleButton onClick={() => navigate("/")}>타이틀</TitleButton>
      </StButtonContainer>
      <StList>
        {postList.map((post) => {
          // if (post.star < 5)
          return (
            <Card
              key={post.id}
              id={post.id}
              image={post.image}
              title={post.title}
              place={post.place}
              body={post.body}
              star={post.star}
            />
          );
        })}
      </StList>
    </StListContainer>
  );
};

export default ListPage;

const StListContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  border: 1px solid blue;
`;
const StButtonContainer = styled.div`
  display: flex;

  width: 90%;

  gap: 340px;
`;
const StList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
  flex-wrap: wrap;

  padding: 15px 0 0 75px;
`;
