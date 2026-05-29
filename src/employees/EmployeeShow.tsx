import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<EmployeeShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="email" />
      <TextField source="department" />
      <NumberField source="salary" />
      <BooleanField source="active" />
    </SimpleShowLayout>
  </Show>
);