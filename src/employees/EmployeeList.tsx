import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput,
} from "react-admin";

const employeeFilters = [
  <TextInput source="q" label="Recherche" alwaysOn />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];

export const EmployeeList = () => (
  <List perPage={5} filters={employeeFilters}>
    <Datagrid rowClick="edit">
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="email" />
      <TextField source="department" />
      <NumberField source="salary" options={{ style: "currency", currency: "EUR" }} />
      <BooleanField source="active" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);