import React from 'react';
import type {ITodo} from './Index';
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

export default ({list, delTodo, editTodo, statusChanged}: IProps) => {
  const [editIndex, setEditIndex] = React.useState(-1);
  function submitChange(value: string) {
    editTodo(editIndex, value);
    setEditIndex(-1);
  }
  function prettyString(sentence: string) {
    return sentence
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
  }
  return (
    <VStack space={2}>
      {!list.length && (
        <Text alignSelf="center" color="gray.400">
          No Task Added
        </Text>
      )}
      {list.map((item, index) => (
        <HStack
          w="100%"
          justifyContent="space-between"
          key={item.title + index.toString()}>
          <Checkbox
            isChecked={item.isCompleted}
            onChange={() => statusChanged(index)}
            colorScheme="info"
            value={item.title}>
            <Text
              isTruncated
              maxW={item.isCompleted ? '200' : '260'}
              mx="2"
              strikeThrough={item.isCompleted}
              color={item.isCompleted ? 'gray.400' : 'coolGray.800'}>
              {prettyString(item.title)}
            </Text>
          </Checkbox>
          <HStack justifyContent="space-between">
            <Flex>
              {!item.isCompleted ? (
                <Text
                  color="darkBlue.500"
                  alignSelf="center"
                  marginRight="20px"
                  onPress={() => setEditIndex(index)}>
                  EDIT
                </Text>
              ) : (
                <Text mx="2" color="gray.400">
                  {item.done}
                </Text>
              )}
            </Flex>
            <IconButton
              size="sm"
              colorScheme="trueGray"
              icon={<CloseIcon size="16px" color="red.400" />}
              onPress={() => delTodo(index)}
            />
          </HStack>
        </HStack>
      ))}
      <TodoEdit
        onSubmit={submitChange}
        index={editIndex}
        isCancel={setEditIndex}
      />
    </VStack>
  );
};
