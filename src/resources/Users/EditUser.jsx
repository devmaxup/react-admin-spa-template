import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  FormDataConsumer,
  ImageField,
  ImageInput,
  required,
} from 'react-admin';
import { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES, STATIC_URL } from '../../constants';

const EditUserToolbar = (props) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};

export default function EditUser(props) {
  return (
    <Edit title="Edit user" {...props}>
      <SimpleForm toolbar={<EditUserToolbar />}>
        <TextInput source="name" validate={[required()]} />
        <ImageInput
          source="avatarImage"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Avatar"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <FormDataConsumer>
          {({ formData }) =>
            formData.avatarImagePath && (
              <img
                src={`${STATIC_URL}${formData.avatarImagePath}`}
                alt="Header"
              />
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
}
