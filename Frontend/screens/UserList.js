import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'https://1bf5-46-138-186-66.ngrok-free.app/api/allusers';
const CHANGE_ROLE_URL = 'https://1bf5-46-138-186-66.ngrok-free.app/api/changerole';

const UserList = ({ userRole, adminEmail, adminPassword }) => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': 'email@example.com',
          'password': 'password',
        },
      });
      const responseData = await response.json();
      console.log('Response data:', responseData); // Log response data
      if (Array.isArray(responseData)) {
        const usersData = responseData.map(user => ({
          id: user.user_id,
          username: user.user_info.user_info_name,
          email: user.user_info.user_info_email,
          role: user.position.position_name,
        }));
        setUsers(usersData);
      } else {
        console.error('Unexpected response data format:', responseData);
        Alert.alert('Error', 'Failed to fetch users. Please check the server response.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users.');
    }
  };

  const handleRoleChange = async (userEmail, newRole) => {
    try {
      const response = await fetch(CHANGE_ROLE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': 'email@example.com',
          'password': 'password',
          'position': newRole,
          'cemail': userEmail,
        },
      });
      const responseData = await response.json();
      console.log('Response data:', responseData); // Log response data
      if (responseData.message === "Success!") {
        setSelectedRoles({ ...selectedRoles, [userEmail]: newRole });
        fetchUsers(); // Update the user list after role change
      } else {
        Alert.alert('Error', responseData.message || 'Failed to update role.');
        console.error('Error updating role:', responseData);
      }
    } catch (error) {
      console.error('Error updating role:', error);
      Alert.alert('Error', 'Failed to update role.');
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.email}>{item.email}</Text>
      {userRole === 'Admin' && item.email && (
        <Picker
          selectedValue={selectedRoles[item.email] || item.role}
          style={styles.picker}
          onValueChange={(itemValue) => handleRoleChange(item.email, itemValue)}
        >
          <Picker.Item label="New" value="New" />
          <Picker.Item label="User" value="User" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>
      )}
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default UserList;
