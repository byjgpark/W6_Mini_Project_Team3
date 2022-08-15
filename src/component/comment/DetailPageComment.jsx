import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  addCommentThunk,
  editCommentThunk,
  checkCommentThunk,
  delCommentThunk,
} from "../../redux/modules/commentSlice";

const DetailPageComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams;
  const initialState = {
    id: 0,
    postId: "",
    commentid: "",
    content: "",
    isEditMode: false,
  };

  const [addComment, setAddComment] = useState(initialState);
  const put_comment = useSelector((state) => state.comments.comments);
  const [newComment, setNewComment] = useState({ id: 0, content: "" });

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
      dispatch(addCommentThunk(addComment));
      setAddComment(initialState);
      alert("정상적으로 댓글이 등록 되었습니다.");
    }
  };
  const onClickSaveButton = (event) => {
    if (newComment.content == "") {
      event.preventDefault();
      alert("댓글을 작성해 주세요");
    } else {
      event.preventDefault();
      dispatch(editCommentThunk(newComment));
      setNewComment(initialState);
      alert("정상적으로 등록 되었습니다");
      dispatch(checkCommentThunk(newComment));
    }
  };

  return (
    <div>
      <InputContainer>
        <InputId>
          <input
            type="text"
            placeholder="ID"
            name="postId"
            value={addComment.postId}
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
      <hr color="red" />
      <>
        {put_comment.length == 0
          ? ""
          : put_comment.map((item, index) => {
              if (item.movieid == id) {
                return (
                  <CommentContainer>
                    <div key={index}>
                      <CommentBox>
                        <IdBox>{item.postId}</IdBox>
                        <BodyBox>{item.content}</BodyBox>
                      </CommentBox>
                      {item.isEditMode ? (
                        <EditBox>
                          <input
                            type="text"
                            name="content"
                            value={newComment.content}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              setNewComment({
                                ...newComment,
                                [name]: value,
                                id: item.id,
                              });
                            }}
                          />
                        </EditBox>
                      ) : (
                        <p>{put_comment?.content}</p>
                      )}
                      <SmallBtn>
                        {item.isEditMode ? (
                          <Btn onClick={onClickSaveButton}>저장</Btn>
                        ) : (
                          <Btn
                            className="btn"
                            onClick={() => dispatch(checkCommentThunk(item))}
                          >
                            수정
                          </Btn>
                        )}

                        <Btn
                          className="btn"
                          onClick={() => {
                            dispatch(delCommentThunk(item.id));
                          }}
                        >
                          삭제
                        </Btn>
                      </SmallBtn>
                    </div>
                  </CommentContainer>
                );
              }
            })}
      </>
    </div>
  );
};

export default DetailPageComment;

const InputContainer = styled.div`
  border: 1px solid red;
  display: flex;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 10px;
  button {
    border: 1px solid blue;
    width: 80px;
    height: 100%;
    cursor: pointer;
  }
`;
const InputId = styled.div`
  input[type="text"] {
    border: 1px solid blue;
    width: 90px;
    height: 100%;
  }
`;
const InputBody = styled.div`
  input[type="text"] {
    border: 1px solid green;
    width: 330px;
    height: 100%;
  }
`;
const CommentContainer = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 20px;
  border: 1px solid red;
`;
const CommentBox = styled.div`
  height: 50px;
  margin-left: 10px;
  margin-top: 10px;
`;

const IdBox = styled.div`
  font-size: medium;
`;
const BodyBox = styled.div`
  font-size: x-large;
`;
const EditBox = styled.div`
  input[type="text"] {
    border: blue 1px solid;
    border-radius: 5px;
    height: 50px;
    margin-left: 10px;
    margin-top: 10px;
  }
`;
const SmallBtn = styled.div`
  margin-left: auto;
  // border: 1px solid yellow;
  margin-top: 15px;
`;
const Btn = styled.div`
  border: black 1px solid;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  width: 45px;
  /* margin-right: 5px;
  padding: 5px, 5px, 5px, 5px; */
`;
