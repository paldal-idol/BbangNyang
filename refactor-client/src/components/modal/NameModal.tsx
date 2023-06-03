import styled from "@emotion/styled";

import { Button } from "@common";
import color from "@/theme/color";
import { useInput } from "@/hooks";

const ModalContainer = styled.div`
  position: fixed;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000090;
  z-index: 4;
`;

const ModalContent = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

const CodeInput = styled.input`
  width: 230px;
  height: 60px;
  font-size: 18px;
  text-align: center;
  margin: 5px;
  box-sizing: border-box;
  border: 0px solid black;
`;

type NameModalProps = {
  name?: string;
  isPreventClose?: boolean;
  onClose: VoidFunction;
  onCreateName: (name: string) => void;
};

export const NAME_MODAL_TYPE = "NAME_MODAL";

export function NameModal({
  name: defaultName,
  isPreventClose = false,
  onClose,
  onCreateName,
}: NameModalProps) {
  const { value: name, onChange: handleChangeName } = useInput(
    defaultName || ""
  );

  const handleCreateName = () => {
    if (name === "") {
      return;
    }
    onCreateName(name);
    onClose();
  };
  return (
    <ModalContainer>
      <ModalBackground onClick={() => !isPreventClose && onClose()} />
      <ModalContent>
        <CodeInput placeholder="닉네임" onChange={handleChangeName} />
        <Button
          backgroundColor={color.button.orange}
          onClick={handleCreateName}
        >
          결정하기
        </Button>
      </ModalContent>
    </ModalContainer>
  );
}
