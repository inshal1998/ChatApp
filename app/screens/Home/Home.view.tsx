import { StyleSheet, Text, View ,ActivityIndicator, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type User = {
  createdAt: FirebaseFirestoreTypes.Timestamp; 
  email: string;
  password: string;
  profilePicture: string | null;
  username: string;
  key: string;
};

const HomeScreen = () => {
    const {themeColors} = useTheme();
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState<User[]>([]);
  console.log(themeColors , 'Theme Color')
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users:User[] = [];
        
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot , 'Document')
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(users);
        console.log(users , 'users')
        setLoading(false);
      });
  
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{backgroundColor: themeColors.background , flex:1}}>
     <FlatList
      data={users}
      renderItem={({ item }:{item:User}) => (
        <View style={{alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:themeColors.text}}>{item.username}</Text>
        </View>
      )}
    />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})