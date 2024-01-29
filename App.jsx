import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {FabButtonContextProvider} from './src/contexts/FabButtonContext';
import {ProfilePictureProvider} from './src/contexts/ProfilePictureContext';
import {RegisterProvider} from './src/contexts/RegisterContext';
import {UserProvider} from './src/contexts/UserContext';
import Routes from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <UserProvider>
        <RegisterProvider>
          <FabButtonContextProvider>
            <ProfilePictureProvider>
              <Routes />
            </ProfilePictureProvider>
          </FabButtonContextProvider>
        </RegisterProvider>
      </UserProvider>
    </NavigationContainer>
  );
}