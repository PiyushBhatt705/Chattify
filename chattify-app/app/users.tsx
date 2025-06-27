// app/users.tsx
import Protected from '../components/Protected';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../lib/api'; // You will define this
import { User } from '../types';

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <Protected>
      <View className="flex-1 bg-black px-4 pt-16">
        <Text className="text-white text-2xl font-bold mb-4">All Users</Text>

        <ScrollView>
          {users.map(user => (
            <Pressable
              key={user._id}
              onPress={() => router.push(`/chat/${user._id}`)}
              className="flex-row items-center mb-4 bg-gray-900 px-4 py-3 rounded-xl"
            >
              <Text className="text-white text-lg">{user.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Protected>
  );
}
