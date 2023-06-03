import styled from "@emotion/styled";

const UserItem = styled.div`
  width: 260px;
  height: 360px;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  box-shadow: 0px 0px 6px #00000029;
`;

const Block = styled.div`
  max-width: 240px;
  width: 100%;
`;

function EmptyCharacter() {
  return (
    <UserItem>
      <UserInfo>
        <Block />
      </UserInfo>
    </UserItem>
  );
}

export default EmptyCharacter;
