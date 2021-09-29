import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import {Provider} from 'react-native-paper';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider as StoreProvider} from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import homeReducer from './store/reducers/home';

const rootReducer = {
  auth: authReducer,
  home: homeReducer,
};

const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <Provider>
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </Provider>
      </StoreProvider>
    );
  }
}

export default App;
