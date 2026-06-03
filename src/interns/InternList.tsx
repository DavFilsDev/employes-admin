import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ReferenceField,
  EditButton,
  DeleteButton,
  SelectInput,
} from "react-admin";

const internFilters = [
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
    alwaysOn
  />,
  <SelectInput
    source="isRemunerate"
    label="Rémunéré"
    choices={[
      { id: true, name: "Rémunéré" },
      { id: false, name: "Non rémunéré" },
    ]}
    alwaysOn
  />,
];

export const InternList = () => (
  <List filters={internFilters} perPage={10}>
    <Datagrid rowClick="show">
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <BooleanField source="isRemunerate" label="Rémunéré" />
      <NumberField
        source="remuneration"
        label="Rémunération"
        options={{ style: "currency", currency: "EUR" }}
      />
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <TextField source="firstname" /> <TextField source="lastname" />
      </ReferenceField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);