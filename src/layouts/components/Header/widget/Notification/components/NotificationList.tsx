import { Avatar, Badge, List } from 'antd';

import Header from './Header';

const data = [
  {
    title: 'Title 1',
    key: '1',
    content: 'react-admin，一个开箱即用的react中后台管理系统',
    time: '刚刚',
  },
  {
    title: 'Title 2',
    key: '2',
    content: 'react-admin，一个开箱即用的react中后台管理系统',
    time: '2024-08-14',
  },
  {
    title: 'Title 3',
    key: '3',
    content: 'react-admin，一个开箱即用的react中后台管理系统',
    time: '2小时前',
  },
  {
    title: 'Title 4',
    key: '4',
    content: 'react-admin，一个开箱即用的react中后台管理系统',
    time: '1天前',
  },
  {
    title: 'Title 5',
    key: '5',
    content: 'react-admin，一个开箱即用的react中后台管理系统',
    time: '2天前',
  },
];

const ListItem = List.Item;

type NotificationListProps = {
  todo?: boolean;
};
const NotificationList = ({ todo }: NotificationListProps) => {
  return (
    <List
      header={<Header todo={todo} />}
      pagination={{ position: 'bottom', align: 'center' }}
      bordered
      itemLayout="horizontal"
      dataSource={data}
      style={{ width: 400 }}
      rowKey="key"
      renderItem={(item) => (
        <ListItem style={{ padding: 12 }} className="hover:bg-[#f5f5f5]">
          <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>}
            title={
              <Badge dot offset={[0, 0]} className="w-full">
                {item.title}
              </Badge>
            }
            description={
              <>
                <p className="line-clamp-2 text-[12px]">{item.content}</p>
                <p className="text-[12px]">{item.time}</p>
              </>
            }
          />
        </ListItem>
      )}
    />
  );
};

export default NotificationList;
