import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const OAUTH_USER_AGENT = 'Mozilla/5.0 (Linux; Android;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36';
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
    const firebaseConfig = {
        apiKey: "AIzaSyBn2akUn5Iq9wLfVwPUsHiTtSP7EV2k-FU",
        authDomain: "hiidentity-staff.firebaseapp.com",

    };
    const onWarning = (e: any) => {
        console.log(e);
    }
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <WebView
                ref={webViewRef}
                userAgent={OAUTH_USER_AGENT}
                style={{marginTop: 20, width: 400}}
                source={{uri: `https://testrunner.hiiretail.com/login?client=mobile&apiKey=${firebaseConfig.apiKey}&authDomain=${firebaseConfig.authDomain}`}}
                javaScriptEnabled
                domStorageEnabled
                onMessage={(event) => {
                    console.log(event.nativeEvent.data)
                }}
                onError={onWarning}
                onHttpError={onWarning}
      />
    </View>
  );
}
