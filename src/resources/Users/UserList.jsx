import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export default function UsersList(props) {
  return (
    <List {...props} sort={{ field: 'createdAt', order: 'DESC' }}>
      <Datagrid>
        <TextField source="name" />
        <DateField source="createdAt" />
        <EditButton basePath="/users" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
