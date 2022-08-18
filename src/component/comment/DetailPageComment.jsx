import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  addCommentThunk,
  checkCommentThunk,
  delCommentThunk,
} from "../../redux/modules/commentSlice";

const DetailPageComment = (props) => {
  console.log("Hello Card ID " + props.CardID);
  const dispatch = useDispatch();
  const { id } = useParams();
  const initialState = {
    cardId: parseInt(id),
    nickname: "",
    content: "",
    isEditMode: false,
  };
  console.log(id);

  useEffect(() => {
    dispatch(checkCommentThunk(id));
  }, [dispatch]);

  const [addComment, setAddComment] = useState(initialState);
  const put_comment = useSelector((state) => state.comments.comments);
  console.log("Hello Selector Comment " + JSON.stringify(put_comment));
  const [newComment, setNewComment] = useState(initialState);

  let inputHandler = (e) => {
    const { name, value } = e.target;
    setAddComment({ ...addComment, [name]: value });
  };
  const onAddSubmitHandler = (event) => {
    if (addComment.title === "" || addComment.content === "") {
      event.preventDefault();
      alert("댓글을 작성해주세요!!");
    } else {
      event.preventDefault();
      console.log("Hello Checking addComment " + addComment);
      dispatch(addCommentThunk(addComment));
      setAddComment(initialState);
      alert("정상적으로 댓글이 등록 되었습니다.");
      // window.location.reload()
    }
  };
  return (
    <div>
      <InputContainer>
        <InputId>
          <input
            type="text"
            placeholder="ID"
            name="nickname"
            value={addComment.nickname}
            onChange={inputHandler}
          />
        </InputId>
        <InputBody>
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            name="content"
            value={addComment.content}
            onChange={inputHandler}
          />
        </InputBody>
        <button onClick={onAddSubmitHandler}>댓글등록</button>
      </InputContainer>
      <hr color="#fcbe32" />
      <>
        {put_comment.length === 0
          ? ""
          : put_comment.map((item, index) => {
              {
                return (
                  <div>
                    <CommentBox key={index}>
                      <TextBox>
                        <IdBox>{item.nickname}</IdBox>
                        <BodyBox>{item.content}</BodyBox>
                      </TextBox>
                      <div>
                        <button
                          onClick={() => {
                            dispatch(delCommentThunk(item));
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </CommentBox>
                  </div>
                );
              }
            })}
      </>
    </div>
  );
};

export default DetailPageComment;

const InputContainer = styled.div`
  display: flex;
  height: 60px;
  margin-top: 30px;
  margin-bottom: 20px;
  button {
    border: none;
    background-color: #ff5f2e;
    border-radius: 10px;
    color: #e1eef6;
    font-size: medium;
    width: 80px;
    height: 100%;
    cursor: pointer;
  }
`;
const InputId = styled.div`
  input[type="text"] {
    border: 1px solid #004e66;
    width: 80px;
    height: 100%;
    border-radius: 10px;
    padding-left: 10px;
    margin-right: 10px;
  }
`;
const InputBody = styled.div`
  input[type="text"] {
    border: 1px solid #004e66;
    width: 300px;
    height: 100%;
    border-radius: 10px;
    padding-left: 10px;
    margin-right: 10px;
  }
`;
const CommentBox = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 20px;
  justify-content: space-between;
  button {
    background-color: #ff5f2e;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 45px;
    border-radius: 10px;
    color: #e1eef6;
    font-size: medium;
    margin-left: 5px;
    margin-top: 5px;
  }
`;
const TextBox = styled.div`
  height: 200px;
  margin-left: 10px;
  margin-top: 10px;

  input[type="text"] {
    border: blue 1px solid;
    border-radius: 5px;
    height: 50px;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const IdBox = styled.div`
  font-size: medium;
`;
const BodyBox = styled.div`
  font-size: large;
`;
