import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SyncScreen from '@screens/Sync';
import NoteListScreen from '@screens/NoteList';
import EditorScreen from '@screens/Editor';
import ScanCodeScreen from '@screens/ScanCode';

import useSyncNote from '@firebase/useSyncNote';
import {useAuth} from '@firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  useAuth();
  useSyncNote();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="NoteList" component={NoteListScreen} />
          <Stack.Screen name="Sync" component={SyncScreen} />
          <Stack.Screen
            name="Editor"
            component={EditorScreen}
            initialParams={{id: null}}
          />
          <Stack.Screen
            name="ScanCode"
            component={ScanCodeScreen}
            initialParams={{callback: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
