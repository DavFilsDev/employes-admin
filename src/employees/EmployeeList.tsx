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
import { QuickStatusToggle } from "./QuickStatusToggle";

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
    <Datagrid rowClick="show">
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <NumberField
        source="salary"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="active" label="Actif" />
      <QuickStatusToggle />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);