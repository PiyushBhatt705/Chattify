// components/Protected.tsx
import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'expo-router';
import { ReactNode } from 'react';

export default function Protected({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
