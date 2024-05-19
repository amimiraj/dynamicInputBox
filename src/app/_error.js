// pages/_error.js

import { useEffect } from 'react';
import { useRouter } from 'next/app';

const CustomErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard route
    router.push('/dashboard');
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return null; // You can return null since the redirection will happen in useEffect
};

export default CustomErrorPage;
