import React from 'react';
import {ITodo} from './Index';
import TodoEdit from './TodoEdit';
import {
  IconButton,
  Checkbox,
  Text,
  VStack,
  HStack,
  CloseIcon,
  Flex,
} from 'native-base';

interface IProps {
  list: ITodo[];
  statusChanged: (index: number) => void;
  delTodo: (index: number) => void;
  editTodo: (index: number, value: string) => void;
}

const TodoList = ({list, delTodo, editTodo, statusChanged}: IProps) => {
  const [editIndex, setEditIndex] = React.useState(-1);
  function submitChange(value: string) {
    editTodo(editIndex, value);
    setEditIndex(-1);
  }
  return (
    <VStack space={2}>
      {!list.length && (
        <Text alignSelf="center" color="gray.400">
          No Task Added
        </Text>
      )}
      {list.map((item, itemIndex) => (
        <HStack
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          key={item.title + itemIndex.toString()}>
          <Checkbox
            isChecked={item.isCompleted}
            colorScheme="info"
            onChange={() => statusChanged(itemIndex)}
            value={item.title}>
            <Text
              mx="2"
              strikeThrough={item.isCompleted}
              color={item.isCompleted ? 'gray.400' : 'coolGray.800'}>
              {item.title}
            </Text>
          </Checkbox>
          <HStack justifyContent="space-between">
            <Flex>
              {!item.isCompleted ? (
                <Text
                  color="darkBlue.500"
                  alignSelf="center"
                  marginRight="20px"
                  onPress={() => setEditIndex(itemIndex)}>
                  EDIT
                </Text>
              ) : (
                <Text
                  mx="2"
                  color={item.isCompleted ? 'gray.400' : 'coolGray.800'}>
                  {'Done: ' + item.done}
                </Text>
              )}
            </Flex>
            <IconButton
              size="sm"
              colorScheme="trueGray"
              icon={<CloseIcon size="16px" color="red.400" />}
              onPress={() => delTodo(itemIndex)}
            />
          </HStack>
        </HStack>
      ))}
      <TodoEdit
        onSubmit={submitChange}
        index={editIndex}
        isClosed={setEditIndex}
      />
    </VStack>
  );
};

export default TodoList;
