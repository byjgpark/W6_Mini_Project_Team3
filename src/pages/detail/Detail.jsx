import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DetailPageModal from "../../component/detailPage/DetailPageModal";
import { getDetailThunk } from "../../redux/modules/targetPostSlice";
import { deleteDetailThunk } from "../../redux/modules/postSlice";
import DetailPageComment from "../../component/comment/DetailPageComment";
// import { _getPost } from "../../redux/modules/list";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const { id } = useParams();
  const [modalOn, setModalOn] = useState(false);
  console.log(id);

  useEffect(() => {
    dispatch(getDetailThunk(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(_getPost());
  // }, []);

  const list = useSelector((state) => state.post.post);
  console.log("checking detail" + list);
  return (
    <div>
      <DetailWrap>
        <DetailContainer>
          <ImgDetailBox>
            <img
              src={`${list[0]?.imgUrl}`}
              alt="이미지를 표시할 수 없습니다."
              style={{ width: "100%", margin: "30px 0", objectFit: "contain" }}
            />
          </ImgDetailBox>
          <DetaiListlBox>
            <h2>{list[0]?.title}</h2>
            <h3># {list[0]?.place}</h3>
            <h3>{list[0]?.star}</h3>
            <p>{list[0]?.content}</p>
            <DetailButton>
              <button onClick={() => setModalOn(true)}>수정</button>
              <button
                onClick={() => {
                  dispatch(deleteDetailThunk(id));
                  navigate("/");
                }}
              >
                삭제
              </button>
            </DetailButton>
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
  /* border: 1px red solid; */
  width: 100%;
  height: 390px;
`;
const DetaiListlBox = styled.div`
  /* border: 1px red solid; */
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
    /* border: 1px red solid; */
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
  /* margin-top: 5px; */
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
