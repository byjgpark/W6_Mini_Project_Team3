import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editDetailThunk } from "../../redux/modules/targetPostSlice";
import styled from "styled-components";

const DetailPageModal = ({ show, onHide, setShow, id }) => {
  const dispatch = useDispatch();
  const initialState = {
    id: 0,
    content: "",
  };

  const [editDetail, setEditDetail] = useState(initialState);
  console.log(editDetail);

  const inputBody = (e) => {
    const { name, value } = e.target;
    setEditDetail({ ...editDetail, [name]: value, id: id });
  };

  const onSubmitHandler = (event) => {
    if (editDetail.title === "" || editDetail.content === "") {
      event.preventDefault();
      alert("내용을 모두 채워주세요");
    } else {
      event.preventDefault();
      dispatch(editDetailThunk(editDetail));
      console.log(editDetail);
      setEditDetail(initialState);
      alert("정상적으로 등록 되었습니다");
      setShow(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalContainer>
        <ModalBox>
          <FaTimesCircle className="faArrowLeft" onClick={onHide} />
          <textarea
            name="content"
            value={editDetail.content}
            type="text"
            placeholder="내용을 입력해주세요"
            onChange={inputBody}
          />
          <button onClick={onSubmitHandler} className="edit_done_btn">
            수정완료
          </button>
        </ModalBox>
      </ModalContainer>
    </Modal>
  );
};

export default DetailPageModal;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15% auto;
  width: 500px;
  height: 300px;
  border: 1px red solid;
  border-radius: 5px;
  background: white;
  padding: 20px;
  textarea[type="text"] {
    border: 1px blue solid;
    width: 450px;
    height: 150px;
    margin: auto;
  }
  button {
    width: 70px;
    height: 50px;
    cursor: pointer;
    margin: 10px auto;
  }
`;
