/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as math from 'mathjs';

function App(): JSX.Element {
  const [expression, setExpression] = useState('');
  const calcButtons = [
    'C',
    '(',
    ')',
    '←',
    '7',
    '8',
    '9',
    '+',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '*',
    '0',
    '.',
    '/',
    '=',
  ];

  const validateExpression = (exp: string) => {
    try {
      math.evaluate(exp);
      return true;
    } catch (error) {
      return false;
    }
  };

  const resolve = (exp: string) => {
    if (validateExpression(exp)) {
      if (exp.length > 0) {
        setExpression(math.evaluate(exp).toString());
      }
    }
  };

  const onClickHandler = (value: string) => {
    switch (value) {
      case '←':
        setExpression(expression.slice(0, -1));
        break;
      case 'C':
        setExpression('');
        break;
      default:
        setExpression(expression + value);
    }
  };

  return (
    <View style={styles.calculator}>
      <TextInput
        value={expression}
        style={styles.input}
        editable={false}
        onChangeText={setExpression}
      />
      <View style={styles.buttons}>
        {calcButtons.map(button => (
          <TouchableOpacity
            style={styles.calcButton}
            key={button}
            onPress={() =>
              button === '=' ? resolve(expression) : onClickHandler(button)
            }>
            <Text style={styles.calcButtonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calculator: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#BFEAF5',
  },
  buttons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: '83%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#EAFDFC',
    borderRadius: 15,
    fontSize: 50,
    margin: 10,
    textAlign: 'right',
    color: '#000',
    height: '20%',
    width: '95%',
  },
  calcButton: {
    backgroundColor: '#EAFDFC',
    borderRadius: 15,
    height: '16%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: '22%',
  },
  calcButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default App;
