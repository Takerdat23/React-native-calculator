import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import math from 'mathjs'; 

export default function App() {
  const [result, setResult] = useState('');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState([]);

  const [historyVisible, setHistoryVisible] = useState(false);

  const handleNum = (input) => {
    setExpression(expression + input);
  };

  const handleOperator = (op) => {
    setExpression(expression + op);
  };

  const handleParentheses = (parenthesis) => {
    setExpression(expression + parenthesis);
  };

  const handleResult = () => {
    try {
      
      console.log( expression)
      const res = eval(expression); 
    
      if (isNaN(res)) {
        setResult('Error: Result is not a number');
      } else {
        const roundedResult = res.toFixed(2);
        setResult(roundedResult);
        const historyItem = `${expression} = ${roundedResult}`;
        setExpression('');
        setHistory([...history, historyItem]);
      }
    } catch (error) {
      setResult('Error: Invalid expression');
      console.error('Evaluation error:', error);
    }
  };
  
  const handleClear = () => {
    setResult('');
    setExpression('');
  };

  const toggleHistory = () => {
    setHistoryVisible(!historyVisible);
  };

  const renderHistoryItem = ({ item }) => (
    <Text style={styles.historyItem}>{item}</Text>
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    monitor: {
      width: '100%',
      height: 150,
      backgroundColor: '#444',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingRight: 20,
      paddingBottom: 20,
    },
    monitorText: {
      color: '#fff',
      fontSize: 50,
    },
    row: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingVertical: 25, 
      paddingHorizontal: 25,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    buttonText: {
      fontSize: 30,
    },
    operatorButton: {
      backgroundColor: '#f0ad4e',
    },
  
    historyContainer: {
      flex: 1,
      marginTop: 20,
    },
    historyItem: {
      color: '#777',
      fontSize: 20,
      marginBottom: 5,
    },
    historyButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#3498db',
      borderRadius: 5,
      alignItems: 'center',
    },
    historyButtonText: {
      color: '#fff',
      fontSize: 20,
    },
    dotButton: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingVertical: 25,
      paddingHorizontal: 25,
      borderWidth: 1,
      borderColor: '#ccc',
    },

    parenthesesButton: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingVertical: 25,
      paddingHorizontal: 25,
      borderWidth: 1,
      borderColor: '#ccc',
    },

    

    
  });
  
  

  
  return (
    <View style={styles.container}>
      <View style={styles.monitor}>
        <Text style={styles.monitorText}>{expression}</Text>
        <Text style={[styles.monitorText, styles.resultText]}>{result}</Text>
      </View>
   
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(7)}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(8)}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(9)}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(4)}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(5)}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(6)}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(1)}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(2)}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(3)}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={[styles.buttonText, styles.clearButton]}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNum(0)}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResult}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        
      </View>

      <View style={styles.row}>
    
        <TouchableOpacity style={styles.dotButton} onPress={() => handleNum('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.parenthesesButton} onPress={() => handleParentheses('(')}>
          <Text style={styles.buttonText}>(</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.parenthesesButton} onPress={() => handleParentheses(')')}>
          <Text style={styles.buttonText}>)</Text>
        </TouchableOpacity>
      </View>

      {historyVisible && (
        <View style={styles.historyContainer}>
          <Text style={{ fontSize: 24, marginBottom: 10, textAlign: 'center' }}>History</Text>
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      <TouchableOpacity style={styles.historyButton} onPress={toggleHistory}>
        <Text style={styles.historyButtonText}>History</Text>
      </TouchableOpacity>
      
    </View>
  );
}
