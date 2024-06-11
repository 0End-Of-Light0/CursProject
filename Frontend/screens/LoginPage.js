import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const registerUser = (email, password, username, surname, patronymic) => {
  fetch('https://1bf5-46-138-186-66.ngrok-free.app/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'email': email,
      'password': password,
      'username': username,
      'surname': surname,
      'patronymic': patronymic,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const loginUser = (email, password, navigation) => {
    fetch('https://1bf5-46-138-186-66.ngrok-free.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': email,
        'password': password,
      },
    })
      .then(response => response.json())
      .then(async (data) => {
        console.log('Response data:', data);
        if (data && data.login) {
          const userData = {
            email: data.login,
            password: data.password,
            position: data.position
          };
          // Сохраняем данные пользователя в AsyncStorage
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          navigation.replace('MainApp');
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};

const LoginPage = ({ navigation }) => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  
    const handleLogin = async () => {
        const { email, password } = userData;
        try {
          // Сохраняем данные пользователя в AsyncStorage
          await AsyncStorage.setItem('userData', JSON.stringify({ email, password}));
          // Затем выполняем запрос на вход
          loginUser(email, password, navigation); // Передаем navigation в loginUser
          navigation.replace('MainApp');
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData?.email || ''} // Добавляем проверку на null
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={userData?.password || ''} // Добавляем проверку на null
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Нет учетной записи? Зарегистрировать</Text>
      </TouchableOpacity>
    </View>
  );
};


const RegistrationPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');

  const handleRegister = () => {
    registerUser(email, password, username, surname, patronymic);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Patronymic"
        value={patronymic}
        onChangeText={setPatronymic}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зарегистрировать</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Уже есть учетная запись? Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
  },
});

export { LoginPage, RegistrationPage };
