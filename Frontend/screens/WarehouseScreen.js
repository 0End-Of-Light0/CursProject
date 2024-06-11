import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Modal, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage

const API_URL = 'https://1bf5-46-138-186-66.ngrok-free.app/api/items';

export default function WarehouseScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortType, setSortType] = useState(); // Переместите sortType сюда

  const handleDeleteProduct = (productId) => {
    // Передайте учетные данные пользователя напрямую вместо использования контекста пользователя
    AsyncStorage.getItem('userData').then(userData => {
      const { email, password } = JSON.parse(userData);
      fetch('https://1bf5-46-138-186-66.ngrok-free.app/api/deleteitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
          'password':  password,
          'prodid': productId,
        },
      })
        .then(response => {
          fetchData(); // Вызовите fetchData после удаления товара
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  };

  const ListItem = ({ name, price, status, productId, type }) => {
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate('ItemDetailsScreen', { productId: productId, products: products });
    };

    const handleDelete = () => {
      handleDeleteProduct(productId);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.itemContainer}>
          <View style={styles.item} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.itemPrice}>{`$${price}`}</Text>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteButton}>Удалить</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.itemStatus, status === 'Unavailable' && styles.unavailable]}>
              <Text style={[styles.statusText, status === 'Unavailable' && styles.unavailable]}>{status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchData = () => {
    setLoading(true);
    AsyncStorage.getItem('userData').then(userData => {
      const { email, password } = JSON.parse(userData);
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': email,
          'password':  password,
          'type': sortType
        }
      })
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setFilteredItems(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    fetchData();
  }, [sortType]); // Вызовите fetchData при изменении sortType

  useEffect(() => {
    const filtered = products.filter(item =>
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, products]);

  const handleAddProduct = () => {
    navigation.navigate('AddProductScreen');
  };

  const handleSort = (type) => {
    setSortType(type);
    setModalVisible(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddProduct}>
          <Text style={styles.addProductButton}>Добавить продукт</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>{sortType ? sortType : "Выберите тип"}</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <TouchableOpacity onPress={() => handleSort('Tech')}>
                <Text style={styles.modalItem}>Tech</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('Fasteners')}>
                <Text style={styles.modalItem}>Fasteners</Text>
              </TouchableOpacity>
              {/* Добавьте дополнительные типы товаров по мере необходимости */}
            </ScrollView>
            <Button title="Закрыть" onPress={() => setModalVisible(false)} />
          </View>
        </TouchableOpacity>
      </Modal>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item, index }) => (
            <ListItem
              name={item.product_name}
              price={item.specification.specification_price}
              status={item.product_in_warehouse ? 'Available' : 'Unavailable'}
              productId={item.product_id}
              products={products}
              key={item.product_id ? item.product_id.toString() : index.toString()} // Use index if product_id is undefined
            />
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>Товаров данного типа нет</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addProductButton: {
    fontSize: 16,
    color: 'blue',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  sortButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
  sortButtonText: {
    fontSize: 16,
    color: 'gray',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    maxHeight: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
  itemStatus: {
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  unavailable: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
