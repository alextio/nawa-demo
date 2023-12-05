import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { useState } from 'react';

import MapView from "./MapView";


export default function App() {
  return (
      <MapView></MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25293e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18, 
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center'
  }
});
