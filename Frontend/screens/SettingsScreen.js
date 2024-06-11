import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(previousState => !previousState);
  }

  const backgroundColor = isOn ? '#111111' : '#ffffff'; // Фоновый цвет в зависимости от состояния переключателя
  const textColor = isOn ? '#ffffff' : '#000000'; // Цвет текста в зависимости от состояния переключателя
  const knobColor = isOn ? '#007bff' : '#aaa'; // Цвет переключателя в зависимости от состояния

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Dark Mode</Text>
      <TouchableOpacity onPress={toggleSwitch} style={[styles.switch]}>
        <View style={[styles.knob, isOn && styles.knobOn, { backgroundColor: knobColor }]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  knob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    margin: 2,
  },
  knobOn: {
    transform: [{ translateX: 20 }],
  },
});
