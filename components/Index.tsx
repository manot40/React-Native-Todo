import React from 'react';
import dayjs from 'dayjs';
import TodoList from './TodoList';
import {
  Input,
  IconButton,
  Text,
  VStack,
  HStack,
  Heading,
  View,
  Box,
  AddIcon,
} from 'native-base';
import TodoAction from './TodoAction';

export interface ITodo {
  title: string;
  isCompleted: boolean;
  done?: string;
}

export default () => {
  const [list, setList] = React.useState<ITodo[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  function addItem(title: string) {
    if (inputValue !== '') {
      const temp = [...list];
      temp.unshift({
        title,
        isCompleted: false,
      });
      setList(temp);
    }
  }
  function handleDelete(index: number) {
    const temp = [...list];
    temp.splice(index, 1);
    setList(temp);
  }
  function handleEdit(index: number, value: string) {
    const temp = [...list];
    temp[index] = {...temp[index], title: value};
    setList(temp);
  }
  function handleStatusChange(index: number) {
    const temp = [...list];
    const status = temp[index].isCompleted;
    const updatedTask = {
      title: temp[index].title,
      isCompleted: !temp[index].isCompleted,
      done: dayjs().format('DD/MM/YYYY HH:mm').toString(),
    };
    temp.splice(index, 1);
    !status
      ? temp.push(updatedTask)
      : //@ts-ignore
        (delete updatedTask.done, temp.unshift(updatedTask));
    setList(temp);
  }
  function handleAction(type: string) {
    type === 'deleteAll' && setList([]);
    if (type === 'deleteComplete' && list.length) {
      const temp = list.filter(item => !item.isCompleted);
      setList(temp);
    }
    if (type === 'completeAll' && list.length) {
      const temp = list.map(item => ({
        ...item,
        isCompleted: true,
        done: dayjs().format('DD/MM/YYYY HH:mm').toString(),
      }));
      setList(temp);
    }
  }
  return (
    <View flex={1} alignItems="center" bgColor="warmGray.50">
      <Box minWidth="90%" maxWidth="90%" marginTop="64px">
        <Heading mb="1" fontSize="4xl" color="darkBlue.500">
          Todo Tasks
        </Heading>
        <Text mb="4" fontSize="3xl">
          {dayjs().format('dddd')}
        </Text>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              height="36px"
              onChangeText={v => setInputValue(v)}
              value={inputValue}
              _focus={{
                borderColor: 'darkBlue.500',
              }}
              onEndEditing={() => {
                addItem(inputValue);
                setInputValue('');
              }}
              placeholder="Add Task"
            />
            <IconButton
              justifyContent="center"
              alignItems="center"
              borderRadius="sm"
              width="36px"
              variant="solid"
              backgroundColor="darkBlue.500"
              icon={<AddIcon size="4" color="warmGray.50" />}
              onPress={() => {
                addItem(inputValue);
                setInputValue('');
              }}
            />
          </HStack>
          <TodoList
            list={list}
            statusChanged={handleStatusChange}
            delTodo={handleDelete}
            editTodo={handleEdit}
          />
        </VStack>
        <TodoAction action={handleAction} />
      </Box>
    </View>
  );
};
