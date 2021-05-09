import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { LoadingPage } from '../../components/@common/LoadingPage';

type Props = {
  children?: ReactElement | ReactElement[];
};

export const Navigation = ({ children }: Props) => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!session) {
    router.push('/api/auth/signin');
    return <LoadingPage></LoadingPage>;
  }

  return <div>Navigation</div>;

  // return (
  //   <Layout className="h-screen">
  //     <Layout.Sider collapsed={true}>
  //       <Menu theme="dark" mode="horizontal" selectedKeys={['/' + router.pathname.split('/')[1]]}>
  //         <Menu.Item key="/">
  //           <Link href="/">home</Link>
  //         </Menu.Item>
  //         <Menu.Item key="/forum">
  //           <Link href="/forum/categories">forum</Link>
  //         </Menu.Item>
  //       </Menu>
  //     </Layout.Sider>
  //     <Layout.Content style={{ padding: '0 50px' }}>{children}</Layout.Content>
  //     <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
  //   </Layout>
  // );
};
