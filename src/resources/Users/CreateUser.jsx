import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
  useRedirect,
} from 'react-admin';
import { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES } from '../../constants';

export default function CreateUser(props) {
  const redirect = useRedirect();
  return (
    <Create
      title="Create a user"
      {...props}
      onSuccess={() => redirect('/users')}
    >
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <ImageInput
          source="avatarImage"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Avatar"
          validate={[required()]}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
}
