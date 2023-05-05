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
  Button,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import * as math from 'mathjs';

const Calculator = ({navigation}) => {
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

  const validateExpression = exp => {
    try {
      math.evaluate(exp);
      return true;
    } catch (error) {
      return false;
    }
  };

  const resolve = exp => {
    if (validateExpression(exp)) {
      if (exp.length > 0) {
        setExpression(math.evaluate(exp).toString());
      }
    }
  };

  const onClickHandler = value => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.calculator}>
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
          <Pressable
            style={styles.navigationButton}
            onPress={() => navigation.navigate('history')}>
            <Text style={styles.historyButtonText}>Historial</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    height: '73%',
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
  navigationButton: {
    backgroundColor: '#EAFDFC',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  historyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Calculator;
