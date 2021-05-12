import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import { LoadingPage } from './@common/LoadingPage';

export default function Pages() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!session) {
    router.push('/api/auth/signin');
    return <LoadingPage></LoadingPage>;
  }

  router.push('/forum/categories');
  return <div></div>;
}
