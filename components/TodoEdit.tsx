import React from 'react';
import {Modal, FormControl, Input, Button} from 'native-base';

interface IProps {
  index: Number;
  onSubmit: (input: string) => void;
  isCancel: (state: number) => void;
}

const TodoEdit: React.FC<IProps> = ({index, onSubmit, isCancel}) => {
  const [modalState, setModalState] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  React.useEffect(() => {
    index > -1 && setModalState(true);
    return () => setInputValue('');
  }, [index]);
  function beginSubmit() {
    onSubmit(inputValue);
    closeModal();
  }
  function closeModal() {
    isCancel(-1);
    setModalState(false);
  }
  return (
    <Modal isOpen={modalState} onClose={() => closeModal()}>
      <Modal.Content maxWidth="480px">
        <Modal.Header>Edit Task</Modal.Header>
        <Modal.Body>
          <FormControl marginTop="8px" marginBottom="8px">
            <FormControl.Label>New Task</FormControl.Label>
            <Input
              _focus={{
                borderColor: 'darkBlue.500',
              }}
              onChangeText={v => setInputValue(v)}
              value={inputValue}
              height="36px"
              placeholder="Enter task..."
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => closeModal()}>
              Close
            </Button>
            <Button
              backgroundColor="darkBlue.500"
              onPress={() => beginSubmit()}>
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TodoEdit;
