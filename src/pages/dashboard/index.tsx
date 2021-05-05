import type { RouteComponentProps } from '@reach/router';
import { navigate } from '@reach/router';
import { Breadcrumb, Table } from 'antd';
import { useContext } from 'react';
import { Page as PageList } from '../../entities/page';
import type { User } from '../../entities/user';
import useCurrentUser from '../../hooks/use-current-user';
import useUsers from '../../hooks/use-users';
import Services from '../../services';
import Page from '../base';
import Actions from './actions';
import Name from './name';
import Role from './role';
import './styles.css';

export default function Dashboard(_: RouteComponentProps) {
  const { accessToPageService } = useContext(Services);
  const currentUser = useCurrentUser();
  const [users, onUserUpdates] = useUsers();

  if (!currentUser) {
      return null
  }

  if (!accessToPageService.hasAccessTo(PageList.DASHBOARD, currentUser)) {
      navigate('/account');
      return null
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Name name={name} />,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role: string) => <Role role={role} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: undefined, user: User) => (
        <Actions
          user={user}
          currentUser={currentUser}
          onAction={(action) => onUserUpdates(user, action)}
        />
      ),
    },
  ];

  return (
    <Page>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background content-container">
        <Table rowKey="id" columns={columns} dataSource={users} />
      </div>
    </Page>
  );
}
