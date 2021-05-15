import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { apiRequest } from '../@common/@apiRequest';
import { REST } from '../@common/@enums';
import { LoadingPage } from './@common/LoadingPage';

function signIn() {
  return apiRequest<{ name: string }>({
    url: 'http://localhost:3000/auth/login',
    method: REST.POST,
  });
}

export default function Login() {
  const router = useRouter();

  async function handleLogIn() {
    const response = await signIn();
    console.log('auth response', response);
    router.push('/');
    return <LoadingPage></LoadingPage>;
  }

  return <Button onClick={() => handleLogIn()}>Log in</Button>;
}
