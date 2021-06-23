import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const tenantAlias = 'extenda';
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
        apiKey: 'AIzaSyBoPRi3VkcBOgRPWyoaVyUYcbSZG13Cmiw',
        authDomain: 'hiidentity-staff.firebaseapp.com',
        databaseURL: 'https://hiidentity-staff.firebaseio.com',
        projectId: 'hiidentity-staff',
        storageBucket: 'hiidentity-staff.appspot.com',
        messagingSenderId: '507969065515',
        appId: '1:507969065515:web:74378c7d42cd5838b7906e',
    };
    // const INJECTED_JAVASCRIPT = `init(${JSON.stringify(firebaseConfig)}, '${tenantAlias}');`;
    console.log(`${JSON.stringify({type: 'INIT', data: {firebaseConfig, clientId: 'test'}})}`);
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
                style={{marginTop: 20, width: 400}}
                source={{uri: 'http://extenda.hiiretail.com:9000/login?client=mobile'}}
                javaScriptEnabled
                domStorageEnabled
                onMessage={(event) => {
              // const message = JSON.parse(event.nativeEvent.data);
              // alert(event.nativeEvent.data);
              console.log(event.nativeEvent.data);
          }}
                onLoadEnd={() => {
                    if (webViewRef.current) {
                        setTimeout(() => {
                            webViewRef.current?.postMessage(`${JSON.stringify({
                                type: 'INIT',
                                data: {firebaseConfig, clientId: 'test'}
                            })}`);
                        }, 100)
                    }
                }
          }
                onError={onWarning}
                onHttpError={onWarning}
      />
    </View>
  );
};

