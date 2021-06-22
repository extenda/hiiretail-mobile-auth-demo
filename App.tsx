import React, {useRef} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';

const tenantId = 'testrunner-2mfuk';
const providerId = 'oidc.wbchz';
const OAUTH_USER_AGENT = 'Mozilla/5.0 (Linux; Android;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36';


type Message = {
    type: string;
    data: Record<string, unknown>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default function App() {
    const webViewRef = useRef<WebView>(null);
    const initRef = useRef(false);
    const firebaseConfig = {
        apiKey: 'AIzaSyAmzj7dLHB1U524laWK0e-zIFl-U6Ay9uo',
        authDomain: 'hiidentity-staff-staging.firebaseapp.com',
        databaseURL: 'https://hiidentity-staff-staging.firebaseio.com',
        projectId: 'hiidentity-staff-staging',
        storageBucket: 'hiidentity-staff-staging.appspot.com',
        messagingSenderId: '448695078080',
        appId: '1:448695078080:web:84adb8e2acaac139d87125'
    };
    const INJECTED_JAVASCRIPT = `init(${JSON.stringify(firebaseConfig)});`
    const onWarning = (e: any) => {
        alert(e);
        console.log(e);
    }
    return (
    <View style={styles.container}>
        <Text>Login</Text>
      <WebView
          ref={webViewRef}
          userAgent={OAUTH_USER_AGENT}
          style={{ marginTop: 20, width: 400 }}
          source={{uri: 'http://extenda.hiiretail.com:8080/'}}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          onMessage={(event) => {
              // const message = JSON.parse(event.nativeEvent.data);
              // alert(event.nativeEvent.data);
              console.log(event.nativeEvent.data);
          }}
          onLoadEnd={() => {
              webViewRef.current?.injectJavaScript(INJECTED_JAVASCRIPT);
              webViewRef.current?.injectJavaScript('getRedirectResult()');
              if (!initRef.current) {
                  initRef.current = true;
              }
          }
          }
          onError={onWarning}
          onHttpError={onWarning}
      />
    </View>
  );
};

