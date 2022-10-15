import { useState, useCallback, useEffect } from 'react';

export default function useAuthModel() {
  const [user, setUser] = useState(null);

  const signin = useCallback((users: any) => {
    setUser(users);
  }, []);

  const signout = useCallback(() => {
    setUser(null);
  }, []);
  useEffect(() => {
    console.log(123);
  }, []);
  return {
    user,
    signin,
    signout,
  };
}
