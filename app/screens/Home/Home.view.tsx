import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type User = {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  email: string;
  password: string;
  profilePicture: string | null;
  username: string;
  key: string;
};

const HomeScreen = () => {
  const { themeColors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const currentUserEmail = auth().currentUser?.email;
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users: User[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data() as Omit<User, 'key'>;
          if (data.email !== currentUserEmail) {
            users.push({
              ...data,
              key: documentSnapshot.id,
            });
          }
        });
        setUsers(users);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ backgroundColor: themeColors.background, flex: 1 }}>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: User }) => (
          <TouchableOpacity
            style={{
              padding: 20,
              borderBottomWidth: 1,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('ChatScreen', { uid: item.key })}
          >
            <Text style={{ color: themeColors.text, fontSize: 17 }}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleLogout}>
        <Text style={styles.floatingButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});