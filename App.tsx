import React from 'react';
import Index from './components/Index';
import {NativeBaseProvider} from 'native-base';

export default () => {
  return (
    <NativeBaseProvider>
      <Index />
    </NativeBaseProvider>
  );
};
