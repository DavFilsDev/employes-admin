import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
  required,
  email,
} from "react-admin";
import { useWatch } from "react-hook-form";

const ConditionalRemunerationInput = () => {
  const isRemunerate = useWatch({ name: "isRemunerate" });
  if (!isRemunerate) return null;
  return (
    <NumberInput
      source="remuneration"
      label="Rémunération (€)"
      validate={required()}
    />
  );
};

const ManagerReferenceInput = () => {
  const department = useWatch({ name: "department" });
  return (
    <ReferenceInput
      source="managerId"
      reference="employees"
      filter={{ department, active: true }}
    >
      <SelectInput
        label="Manager"
        optionText={(record) => `${record.firstname} ${record.lastname}`}
        validate={required()}
      />
    </ReferenceInput>
  );
};

export const InternCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={[required(), email()]} />
      <SelectInput
        source="department"
        label="Département"
        choices={[
          { id: "Informatique", name: "Informatique" },
          { id: "Marketing", name: "Marketing" },
          { id: "RH", name: "RH" },
          { id: "Finance", name: "Finance" },
        ]}
        validate={required()}
      />
      <BooleanInput source="isRemunerate" label="Rémunéré" />
      <ConditionalRemunerationInput />
      <ManagerReferenceInput />
    </SimpleForm>
  </Create>
);