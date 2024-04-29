import React, { useState, useEffect } from 'react';
import './App.css';
import { Table } from 'antd';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    fetchData();
  }, [pagination.current]); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?skip=${(pagination.current - 1) * pagination.pageSize}&limit=0`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData.posts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  return (
    <div className="App" style={{textWrap:'nowrap'}}>
      
      <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      onChange={handleTableChange}
      rowKey="id"
    />

    </div>
  );
}

export default App;
