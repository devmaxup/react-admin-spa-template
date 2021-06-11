import React from 'react';
import { Admin, Resource } from 'react-admin';
import imageUploadProvider from '../dataProviders/imageUploadProvider';
import authProvider from '../dataProviders/authProvider';

import UsersList from './Users/UserList';
import CreateUser from './Users/CreateUser';
import EditUsers from './Users/EditUser';

export default () => (
  <Admin dataProvider={imageUploadProvider} authProvider={authProvider}>
    <Resource
      name="users"
      list={UsersList}
      create={CreateUser}
      edit={EditUsers}
    />
  </Admin>
);
