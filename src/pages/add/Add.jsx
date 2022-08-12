import React from "react";
import styled from "styled-components";

const Add = () => {
  return (
    <addWrap>
      <addConatiner>
        <inputBox>
          <imgContainer>
            <imgInput></imgInput>
          </imgContainer>
          <formBox>
            <inputBody>
              <input type="text" placeholder="제목을 입력해주세요" />
            </inputBody>
            <inputBody>
              <input type="text" placeholder="추천 장소를 입력해주세요" />
            </inputBody>
            <bodyBox>
              <textarea type="text" placeholder="내용을 입력해주세요" />
            </bodyBox>
          </formBox>
        </inputBox>
      </addConatiner>
    </addWrap>
  );
};

export default Add;

const addConatiner = styled.div`
  border: 1px solid red;
  width: 500px;
  height: 500px;
`;
