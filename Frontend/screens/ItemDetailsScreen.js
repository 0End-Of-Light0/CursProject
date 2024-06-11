
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://1bf5-46-138-186-66.ngrok-free.app/api/changeitem';

export default function ItemDetailsScreen({ route }) {
  const { productId, products } = route.params;
  const product = products.find(item => item.product_id === productId);
  const [arrivalTime, setArrivalTime] = useState(product.arrival);


  const [isModified, setIsModified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // States for form inputs
  const [name, setName] = useState(product.product_name);
  const [price, setPrice] = useState(product.specification.specification_price);
  const [description, setDescription] = useState(product.product_description || '');
  const [weight, setWeight] = useState(product.specification.specification_weight);
  const [count, setCount] = useState(product.specification.specification_count.toString());
  const [distributorName, setDistributorName] = useState(product.distributor.distributor_name);
  const [warehouseAddress, setWarehouseAddress] = useState(product.warehouse.warehouse_adress);
  const [warehouseNumber, setWarehouseNumber] = useState(product.warehouse.warehouse_number);
  const [warehouseSection, setWarehouseSection] = useState(product.warehouse.warehouse_section);
  const [warehouseShelf, setWarehouseShelf] = useState(product.warehouse.warehouse_shelf);
  const [warehouseCell, setWarehouseCell] = useState(product.warehouse.warehouse_cell);
  const [type, setType] = useState(product.type.type_id);
  const [inWarehouse, setInWarehouse] = useState(product.product_in_warehouse);
  const [length, setLength] = useState(product.specification.size.size_length);
  const [width, setWidth] = useState(product.specification.size.size_width);
  const [height, setHeight] = useState(product.specification.size.size_height);

  useEffect(() => {
    const isProductModified = () => {
      // Compare form inputs with initial product data
      setIsModified(
        name !== product.product_name ||
        price !== product.specification.specification_price ||
        description !== product.product_description ||
        weight !== product.specification.specification_weight ||
        count !== product.specification.specification_count.toString() ||
        distributorName !== product.distributor.distributor_name ||
        warehouseAddress !== product.warehouse.warehouse_adress ||
        warehouseNumber !== product.warehouse.warehouse_number ||
        warehouseSection !== product.warehouse.warehouse_section ||
        warehouseShelf !== product.warehouse.warehouse_shelf ||
        warehouseCell !== product.warehouse.warehouse_cell ||
        type !== product.type.type_id ||
        inWarehouse !== product.product_in_warehouse ||
        length !== product.specification.size.size_length ||
        width !== product.specification.size.size_width ||
        height !== product.specification.size.size_height ||
        arrivalTime !== product.arrival
      );
    };
    isProductModified();
  }, [name, price, description, weight, count, distributorName, warehouseAddress, warehouseNumber, warehouseSection, warehouseShelf, warehouseCell, type, inWarehouse, length, width, height, arrivalTime]);

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');

      if (email && password) {
        handleSave(email, password);
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  };

  const handleSave = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
          'password': password,
          'prodid': productId,
          'name': name,
          'distributor': distributorName,
          'price': price,
          'arrival': arrivalTime,
          'count': parseInt(count),
          'length': length,
          'width': width,
          'height': height,
          'description': description,
          'adress': warehouseAddress,
          'number': warehouseNumber,
          'section': warehouseSection,
          'shelf': warehouseShelf,
          'cell': warehouseCell,
          'type': type,
          'inwarehouse': inWarehouse,
        }
      });
      setLoading(false);
      setIsEditing(false);
      setIsModified(false);
      alert('Изменения сохранены');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setLoading(false);
      alert('Ошибка сохранения изменений');
    }
  };

  const handleCancel = () => {
    // Reset form inputs to initial product data
    setName(product.product_name);
    setPrice(product.specification.specification_price);
    setDescription(product.product_description || '');
    setWeight(product.specification.specification_weight);
    setCount(product.specification.specification_count.toString());
    setDistributorName(product.distributor.distributor_name);
    setWarehouseAddress(product.warehouse.warehouse_adress);
    setWarehouseNumber(product.warehouse.warehouse_number);
    setWarehouseSection(product.warehouse.warehouse_section);
    setWarehouseShelf(product.warehouse.warehouse_shelf);
    setWarehouseCell(product.warehouse.warehouse_cell);
    setType(product.type.type_id);
    setInWarehouse(product.product_in_warehouse);
    setLength(product.specification.size.size_length);
    setWidth(product.specification.size.size_width);
    setHeight(product.specification.size.size_height);
    setArrivalTime(product.arrival);
    setIsEditing(false);
    setIsModified(false);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Продукт не найден</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Детали товара</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Название:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Цена:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Описание:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={description}
          onChangeText={setDescription}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Вес:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={weight}
          keyboardType="numeric"
          onChangeText={setWeight}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Количество:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={count}
          keyboardType="numeric"
          onChangeText={setCount}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Имя дистрибьютора:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={distributorName}
          onChangeText={setDistributorName}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Адрес склада:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={warehouseAddress}
          onChangeText={setWarehouseAddress}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Номер склада:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={warehouseNumber}
          onChangeText={setWarehouseNumber}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Секция склада:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={warehouseSection}
          onChangeText={setWarehouseSection}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Полка склада:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={warehouseShelf}
          onChangeText={setWarehouseShelf}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Ячейка склада:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={warehouseCell}
          onChangeText={setWarehouseCell}
          editable={isEditing}
        />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Товар на складе:</Text>
        <Switch
          value={inWarehouse}
          onValueChange={setInWarehouse}
          disabled={!isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Длина:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={length}
          keyboardType="numeric"
          onChangeText={setLength}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Ширина:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={width}
          keyboardType="numeric"
          onChangeText={setWidth}
          editable={isEditing}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Высота:</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={height}
          keyboardType="numeric"
          onChangeText={setHeight}
          editable={isEditing}
        />
      </View>
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, !isModified && styles.buttonDisabled]} onPress={handleSave} disabled={!isModified}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Сохранить</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Редактировать</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20, // Добавлен отступ снизу
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 65, // Добавлен отступ снизу
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
