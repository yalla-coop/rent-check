import React, { useEffect, useState } from 'react';
import { List, Input } from 'antd';

import useWindowWidth from '../../../hooks/useWindowWidth';
import useApiCallback from '../../../hooks/useApiCallback';

export default function ListWithFilter({ dataSource, renderItem, ...props }) {
  const [searchText, setSearchText] = useState('');
  const [filteredSource, setFilteredSource] = useState(dataSource);
  useEffect(
    () =>
      dataSource &&
      setFilteredSource(
        dataSource.filter(
          user =>
            user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
        )
      ),
    [dataSource, searchText]
  );
  const [isSmallScreen, setSmallScreen] = useState(false);
  const device = useWindowWidth();

  useEffect(() => {
    setSmallScreen(device.isTablet);
  }, [device]);
  return (
    <div>
      <Input
        placeholder="Search by name or email"
        allowClear
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <List
        dataSource={filteredSource}
        renderItem={renderItem}
        itemLayout={isSmallScreen ? 'vertical' : 'horizontal'}
        bordered
        {...props}
      />
    </div>
  );
}
