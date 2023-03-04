import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Formulario} from './components/';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Text>App</Text>
        <Formulario />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {},
});

export default App;
