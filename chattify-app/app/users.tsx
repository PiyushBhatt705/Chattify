import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { getAllUsers } from '../lib/api';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function UsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users);
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message || 'Failed to fetch users' });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push(`/chat/${item._id}`)}
      className="flex-row items-center bg-white/10 rounded-xl p-4 mb-3 active:opacity-80"
    >
      <Image
        source={item.avatar?.url ? { uri: item.avatar.url } : require('../assets/avatar-default.png')}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View>
        <Text className="text-light font-semibold text-lg">{item.name}</Text>
        <Text className="text-gray-400 text-sm">{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black/60 px-6 pt-12">
      <Animated.Text
        entering={FadeInDown}
        className="text-light text-3xl font-bold mb-6"
      >
        People on Chattify
      </Animated.Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-light text-center mt-10">
            No users found.
          </Text>
        }
      />
    </View>
  );
}
