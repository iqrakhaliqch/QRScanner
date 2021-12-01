import React, {useState} from 'react';
import {
  AppRegistry,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Dimensions,
  StyleSheet,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

const App = () => {
  let scanner;
  const [position, setPosition] = useState('false');
  const onSuccess = e => {
    console.log('scan activated');
    Linking.openURL(e.data).catch(err => {
      console.log('Failed to open the QR Code Page', err);
      alert('Failed to Scan the QR Code', err);
    });
  };

  const checkCameraType = () => {
    if (position === false) {
      setPosition(true);
    } else {
      setPosition(false);
    }
  };

  const rescan = () => {
    scanner._setScanning(false);
    console.log('rescan complete');
  };

  return (
    <SafeAreaView>
      <QRCodeScanner
        ref={(cam)=> scanner=cam}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onRead={e => onSuccess(e)}
        topContent={
          <View>
            <Text
              style={{
                color: 'maroon',
                fontSize: 25,
                fontFamily: 'monospace',
                fontWeight: '800',
              }}>
              Scan the QR Code.
            </Text>
            <TouchableOpacity onPress={checkCameraType}>
              <Text
                style={{
                  backgroundColor: 'pink',
                  padding: 2,
                  fontSize: 20,
                  fontFamily: 'monospace',
                  color: 'black',
                  borderColor: 'maroon',
                  borderWidth: 2,
                  textAlign: 'center',
                  fontWeight: '400',
                }}>
                Revert Camera
              </Text>
            </TouchableOpacity>
          </View>
        }
        bottomContent={
          <View>
            <TouchableOpacity onPress={rescan}>
              <Text
                style={{
                  backgroundColor: 'lightgreen',
                  padding: 5,
                  fontSize: 20,
                  fontFamily: 'monospace',
                  color: 'black',
                  borderColor: 'white',
                  borderWidth: 2,
                  textAlign: 'center',
                  fontWeight: '400',
                }}>
                Re-Scan QR Code
              </Text>
            </TouchableOpacity>
          </View>
        }
        showMarker={true}
        reactive={true}
        reactivate={true}
        fadeIn={false}
        cameraStyle={{
          height: Dimensions.get('screen').height / 1.3,
          overflow: 'hidden',
        }}
        cameraType={position ? 'back' : 'front'}
        bottomViewStyle={{flex: 0, backgroundColor: 'green', height: 50}}
        topViewStyle={{
          flex: 0,
          backgroundColor: 'white',
          height: 80,
          marginVertical: 5,
        }}
        reactivateTimeout={1000}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
export default App;
