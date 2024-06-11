// AddProductScreen.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://1bf5-46-138-186-66.ngrok-free.app/api/newitem';

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [distributor, setDistributor] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [section, setSection] = useState('');
  const [shelf, setShelf] = useState('');
  const [cell, setCell] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [count, setCount] = useState('');
  const [arrival, setArrival] = useState(new Date().toISOString());
  const [inWarehouse, setInWarehouse] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (modalVisible === false && errorMessage === 'Item was created successfully!') {
      navigation.navigate('WarehouseScreen');
    }
  }, [modalVisible, errorMessage]);
  const handleAddProduct = async (type, name, distributor, address, number, section, shelf, cell, length, width, height, weight, count, price, arrival, inWarehouse, description) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': 'email@example.com',
          'password': 'password',
          'type': type,
          'name': name,
          'distributor': distributor,
          'description': description,
          'adress': address,
          'number': number,
          'section': section,
          'shelf': shelf,
          'cell': cell,
          'length': length,
          'weight': weight,
          'count': count,
          'price': price,
          'arrival': arrival,
          'inwarehouse': inWarehouse,
          'width': width,
          'height': height,
        },
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        console.log(data);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Response Text:', text);
        setErrorMessage('Ошибка при разборе ответа от сервера.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Network Error:', error);
      if (error.response && error.response.data.message === 'столбец "nan" не существует') {
        setErrorMessage('Ведите корректные данные.');
        setModalVisible(true);
      } else {
        setErrorMessage('Произошла ошибка при выполнении запроса.');
        setModalVisible(true);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Название</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Цена</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Описание</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Тип</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
      />
      <Text style={styles.label}>Поставщик</Text>
      <TextInput
        style={styles.input}
        value={distributor}
        onChangeText={setDistributor}
      />
      <Text style={styles.label}>Адрес</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Номер склада</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
      />
      <Text style={styles.label}>Секция</Text>
      <TextInput
        style={styles.input}
        value={section}
        onChangeText={setSection}
      />
      <Text style={styles.label}>Стойка</Text>
      <TextInput
        style={styles.input}
        value={shelf}
        onChangeText={setShelf}
      />
      <Text style={styles.label}>Ячейка</Text>
      <TextInput
        style={styles.input}
        value={cell}
        onChangeText={setCell}
      />
      <Text style={styles.label}>Длина</Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Ширина</Text>
      <TextInput
        style={styles.input}
        value={width}
        onChangeText={setWidth}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Высота</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Вес</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Количество</Text>
      <TextInput
        style={styles.input}
        value={count}
        onChangeText={setCount}
        keyboardType="numeric"
      />
     <TouchableOpacity style={styles.button} onPress={() => handleAddProduct(type, name, distributor, address, number, section, shelf, cell, length, width, height, weight, count, price, arrival, inWarehouse, description)}>
      <Text style={styles.buttonText}>Добавить продукт</Text>
    </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Для предотвращения перекрытия кнопки добавления продукта внизу
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    width: '80%', // Ширина модального окна
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    alignSelf: 'center', // Выравнивание по центру по горизонтали
    top: '50%', // Расположение по вертикали в середине
    transform: [{ translateY: -50 }], // Смещение по вертикали на половину высоты модального окна
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }, 
  
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});
