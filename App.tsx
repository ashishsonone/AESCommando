/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Button, NativeModules, Switch, TextInput, TouchableOpacity } from 'react-native';
import type {PropsWithChildren} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// const NewLineBreak = () => <br />;

// const ToggleButton = ({onToggleChange, onText, offText}) => {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//     onToggleChange(!isToggled)
//   };

//   return (
//     <TouchableOpacity style={[styles.button, isToggled ? styles.buttonActive : null]} onPress={handleToggle}>
//       <Text style={styles.buttonText}>{isToggled ? onText : offText}</Text>
//     </TouchableOpacity>
//   );
// };

function App(): React.JSX.Element {
  const isDarkMode = false // useColorScheme() === 'dark';

  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [encModeOn, setEncModeOn] = useState(true)

  const [outText, setOutText] = useState('<EMPTY>');

  const copyToClipboard = () => {
    Clipboard.setString(outText)
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {EncModule} = NativeModules

  const pressMe = async () => {
    // setInput('Ho ho')
    // console.log({encModeOn, input, password})

    if (encModeOn) {
      const cipherText = await EncModule.encode(input, password)
      setOutText(cipherText)
    }
    else {
      const plainText = await EncModule.decode(input, password)
      setOutText(plainText)
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          <View style={styles.container}>
            <Text style={styles.headerText}>AES Commando</Text>
          </View>

          <View style={styles.container}>
            <Text>{encModeOn && 'Encryption Mode' || 'Decryption Mode'}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={encModeOn ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={setEncModeOn}
              value={encModeOn}
            />
          </View>

          <TextInput
            style={styles.input}
            editable={true}
            onChangeText={setInput}
            value={input}/>

          <TextInput
            style={styles.input}
            editable={true}
            onChangeText={setPassword}
            value={password}/>

          <View style={styles.container}>
            <Button title={"Run"} onPress={pressMe} />
            <Text>Output={outText}</Text>
            <Button title={"Copy To Clipboarad"} onPress={copyToClipboard} />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for better text visibility
    padding: 20,
  },
  // toggle button
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonActive: {
    backgroundColor: '#99CCFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default App;
