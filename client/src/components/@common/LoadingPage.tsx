import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingPage = () => {
  return (
    <div className="flex justify-center h-screen items-center bg-gray-300">
      <Spin indicator={<LoadingOutlined className="text-green-800" spin style={{ fontSize: 30 }} />} />
    </div>
  );
};
