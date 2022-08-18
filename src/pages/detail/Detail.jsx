import styled from "styled-components";
import BackButton from "../../component/backButton/BackButton";
import TitleButton from "../../component/titleButton/TitleButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DetailPageModal from "../../component/detailPage/DetailPageModal";
import { getDetailThunk } from "../../redux/modules/targetPostSlice";
import { deleteDetailThunk } from "../../redux/modules/postSlice";
import DetailPageComment from "../../component/comment/DetailPageComment";
import logo from "../../logo.png"

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modalOn, setModalOn] = useState(false);
  const handleImgError = (e) => {
    e.target.src = logo;
  }

  useEffect(() => {
    dispatch(getDetailThunk(id));
  }, [dispatch, id]);

  const list = useSelector((state) => state.post.post);
  return (
    <StContainer >
      <StBackDiv>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
      </StBackDiv>
      <DetailWrap>
        <DetailContainer>
          <ImgDetailBox>
            <StImg
              src={`${list[0]?.imgUrl}`}
              onError={handleImgError}
              alt="이미지를 표시할 수 없습니다."
            />
          </ImgDetailBox>
          <DetaiListlBox>
            <h2>{list[0]?.title}</h2>
            <h3># {list[0]?.place}</h3>
            <p style={{maxHeight:'25px'}}>{"⭐".repeat(list[0]?.star)}</p>
            <p>{list[0]?.content}</p>
            {list.nickname === list.nickname ?
              <DetailButton>
                <button onClick={() => setModalOn(true)}>수정</button>
                <button
                  onClick={() => {
                    dispatch(deleteDetailThunk(id));
                    navigate(-1);
                    alert('삭제가 완료 되었습니다.')
                  }}
                >
                  삭제
                </button>
              </DetailButton> :
              <></>}
              
          </DetaiListlBox>
        </DetailContainer>
        <CommentContainer>
          <DetailPageComment CardID={id}/>
        </CommentContainer>
      </DetailWrap>
      <DetailPageModal
        show={modalOn}
        id={id}
        setShow={setModalOn}
        onHide={() => setModalOn(false)}
      >
      </DetailPageModal>
    </StContainer>
  );
};

export default Detail;

const DetailWrap = styled.div`
  border: none;
  width: 1200px;
  height: 800px;
  display: flex;
  flex-direction: row;
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
`;
const DetailContainer = styled.div`
  margin: 10px auto;
  border: 3px #004e66 solid;
  border-radius: 10px;
  width: 100%;
  padding: 40px;
`;
const CommentContainer = styled.div`
  margin: 10px auto;
  border: 3px #004e66 solid;
  border-radius: 10px;
  width: 100%;
  padding: 40px;
`;
const ImgDetailBox = styled.div`
  width: 100%;
  /* max-height:390px;  */
  height: 390px;
`;
const StImg = styled.img`
  height:100%;
  width: 100%;
  object-fit:cover;
`
const DetaiListlBox = styled.div`
  width: 100%;
  height: 50px;

  h2 {
    padding-left: 10px;
  }
  h3 {
    padding-left: 10px;
  }
  h3 {
    padding-left: 10px;
  }
  p {
    width: 100%;
    height: 90px;
    padding-left: 10px;
    padding-top: 10px;
  }
`;
const DetailButton = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  margin-left: 150px;
  button {
    background-color: #ff5f2e;
    border: none;
    cursor: pointer;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    color: #e1eef6;
    font-size: medium;
  }
`;
const StContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;
`;
const StBackDiv = styled.div`
  width:70%;
`;