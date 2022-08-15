import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DetailPageModal from "../../component/detailPage/DetailPageModal";
import {
  deleteDetailThunk,
  getDetailThunk,
} from "../../redux/modules/targetPostSlice";
import DetailPageComment from "../../component/comment/DetailPageComment";
import { _getPost } from "../../redux/modules/list";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const { id } = useParams();
  const [modalOn, setModalOn] = useState(false);
  console.log(id);

  // useEffect(() => {
  //   dispatch(getDetailThunk(id));
  // }, [dispatch, id]);

  useEffect(()=>{
    dispatch(_getPost());
  },[]);

  const list = useSelector(state => state.list.postList);
  console.log(list);
  // .posts.postings
  return (
    <div>
      <DetailWrap>
        <DetailContainer>
          <ImgDetailBox>
            <img src={`${list[id].image}`} alt="이미지를 표시할 수 없습니다." style={{ width:'100%', margin:'30px 0',objectFit:'contain' }}/>
          </ImgDetailBox>
          <DetaiListlBox>
            <h2>{list[id].title}</h2>
            <h3>{list[id].place}</h3>
            <h3>{list[id].star}</h3>
            <p>{list[id].body}</p>
            <DetailButton>
              <button onClick={() => setModalOn(true)}>수정</button>
              <button
                onClick={() => {
                  dispatch(deleteDetailThunk(list.id));
                  navigate("/");
                }}
              >
                삭제
              </button>
            </DetailButton>
          </DetaiListlBox>
        </DetailContainer>
        <CommentContainer>
          <DetailPageComment />
        </CommentContainer>
      </DetailWrap>
      <DetailPageModal
        show={modalOn}
        id={id}
        setShow={setModalOn}
        onHide={() => setModalOn(false)}
      >
        {" "}
      </DetailPageModal>
    </div>
  );
};

export default Detail;

const DetailWrap = styled.div`
  border: none;
  width: 1200px;
  height: 800px;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const DetailContainer = styled.div`
  margin: 10px auto;
  border: 1px red solid;
  border-radius: 10px;
  width: 100%;
  padding: 40px;
`;
const CommentContainer = styled.div`
  margin: 10px auto;
  border: 1px red solid;
  border-radius: 10px;
  width: 100%;
  padding: 40px;
`;
const ImgDetailBox = styled.div`
  border: 1px red solid;
  width: 100%;
  height: 400px;
`;
const DetaiListlBox = styled.div`
  border: 1px red solid;
  width: 100%;
  height: 60px;
  h2 {
    color: red;
  }
  h3 {
    color: blue;
  }
  h3 {
    color: blue;
  }
  p {
    color: blue;
    border: 1px red solid;
    width: 100%;
    height: 100px;
  }
`;
const DetailButton = styled.div`
  border: 1px solid green;
  display: flex;
  gap: 10px;
  margin-top: 24px;
  button {
    border: 1px solid blue;
    cursor: pointer;
    width: 50%;
  }
`;
