import { StyleSheet, Text, View ,ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { RootStackParamList } from '../../routes/Navigation-Types';

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
    const navigation = useNavigation<any>(); // Initialize navigation

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
    <View style={{backgroundColor: themeColors.background , flex:1 }}>
     <FlatList
      data={users}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }:{item:User}) => (
        <TouchableOpacity style={{
            padding:20,
            borderBottomWidth:1,
            alignItems:'center',
         }}
         onPress={() => navigation.navigate('ChatScreen', { uid: item.key })} // Pass uid to ChatScreen
         >
          <Text style={{color:themeColors.text , fontSize:17}}>{item.username}</Text>
        </TouchableOpacity>
      )}
    />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})