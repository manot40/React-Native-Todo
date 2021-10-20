import React from 'react';
import {
  Actionsheet,
  Button,
  Divider,
  Fab,
  HamburgerIcon,
  Modal,
  Text,
} from 'native-base';

export default ({action}: {action: (type: string) => void}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalState, setModal] = React.useState(false);
  return (
    <>
      <Fab
        position="absolute"
        size="sm"
        colorScheme="darkBlue"
        onPress={() => setIsOpen(true)}
        icon={<HamburgerIcon color="warmGray.50" size="sm" />}
      />
      <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Actionsheet.Content>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item
            _text={{
              color: 'darkBlue.500',
            }}
            onPress={() => {
              action('completeAll');
              setIsOpen(!isOpen);
            }}>
            Complete All Task
          </Actionsheet.Item>
          <Actionsheet.Item
            _text={{
              color: 'darkBlue.500',
            }}
            onPress={() => {
              action('deleteComplete');
              setIsOpen(!isOpen);
            }}>
            Delete Completed
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item
            _text={{
              color: 'red.400',
            }}
            onPress={() => setModal(true)}>
            Delete All
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal isOpen={modalState} onClose={() => setModal(false)}>
        <Modal.Content maxWidth="480px">
          <Modal.Header>
            <Text fontSize="lg" fontWeight="semibold" marginLeft="8px">
              Are You Sure?
            </Text>
          </Modal.Header>
          <Modal.Footer>
            <Button.Group>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModal(false);
                  setIsOpen(!isOpen);
                }}>
                Cancel
              </Button>
              <Button
                backgroundColor="red.500"
                onPress={() => {
                  action('deleteAll');
                  setModal(false);
                  setIsOpen(!isOpen);
                }}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
