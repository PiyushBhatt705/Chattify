import { useAuth as useAuthContext } from '@/context/authContext';

const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
