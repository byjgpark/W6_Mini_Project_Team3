import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../../component/backButton/BackButton';
import Card from '../../component/card/Card'
import TitleButton from '../../component/titleButton/TitleButton';
import { _getPost } from '../../redux/modules/list';

const ListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postList = useSelector(state => state.list.postList)
  const param = useParams()
  console.log(param)
  console.log(postList)

  useEffect(() => {
    dispatch(_getPost());
  }, []);

  console.log("this is local storage" + window.localStorage.getItem('SavedToken'))

  return (
    <>
    <StListContainer>
      <StButtonContainer>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        <TitleButton onClick={() => navigate("/")}>타이틀</TitleButton>
      </StButtonContainer>
        <StList>
          {postList?.map((post) => {
            // console.log(post)
            if(post.ages === param.id){
              return (
                <Card
                  key={post.id}
                  id={post.id}
                  image={post.imgUrl}
                  title={post.title}
                  place={post.place}
                  body={post.content}
                  star={post.star}
                />
              )}else if(param.id === undefined) {
                return (
                  <Card
                    key={post.id}
                    id={post.id}
                    image={post.imgUrl}
                    title={post.title}
                    place={post.place}
                    body={post.content}
                    star={post.star}
                  />
                )
              }
          })}
        </StList>
        <TopBtn onClick={() => window.scrollTo({top:0, left:0, behavior:'smooth'})}>TOP</TopBtn>
    </StListContainer>
    </>
  );
};

export default ListPage;

const StListContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  margin: 30px auto;
  /* border: 1px solid blue; */
`;
const StButtonContainer = styled.div`
  display: flex;
  justify-content:flex-start;
  gap:375px;
  margin-left:75px;
`
const StList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
  flex-wrap: wrap;

  padding: 30px 0 0 75px;
`;
const TopBtn = styled.button`
  width:50px;
  height:50px;
  
  font-weight:700;

  border:none;
  border-radius:50%;

  background-color:initial;
  box-shadow: 0px 0px 10px gray;

  margin:48% 0 0 80% ;
  position:fixed;

  cursor: pointer;

  transition:all 200ms;
  :hover{
    transform:scale(1.2)
  };

`;
