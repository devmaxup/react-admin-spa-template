import React from 'react';
import { Admin, Resource } from 'react-admin';
import restWithFileUploadProvider from '../dataProviders/restWithFileUploadProvider';
import authProvider from '../dataProviders/authProvider';

import UsersList from './Users/UserList';
import CreateUser from './Users/CreateUser';
import EditUsers from './Users/EditUser';

export default () => (
  <Admin dataProvider={restWithFileUploadProvider} authProvider={authProvider}>
    <Resource
      name="users"
      list={UsersList}
      create={CreateUser}
      edit={EditUsers}
    />
  </Admin>
);
