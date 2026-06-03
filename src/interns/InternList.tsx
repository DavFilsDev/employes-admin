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
  useCreate,
  useNotify,
  useRefresh,
} from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Alert,
} from "@mui/material";
import { useState } from "react";

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
    source="isRemunerated"
    label="Rémunéré"
    choices={[
      { id: true, name: "Rémunéré" },
      { id: false, name: "Non rémunéré" },
    ]}
    alwaysOn
  />,
];

const QuickCreateModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [create, { isPending, error }] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    managerId: "",
  });

  const handleSubmit = async () => {
    await create(
      "interns",
      {
        data: {
          ...form,
          managerId: Number(form.managerId),
          isRemunerated: false,
          remuneration: 0,
        },
      },
      {
        onSuccess: () => {
          notify("Stagiaire créé avec succès !", { type: "success" });
          refresh();
          onClose();
          setForm({ firstname: "", lastname: "", managerId: "" });
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter un stagiaire rapide</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <MuiTextField
          label="Prénom"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          fullWidth
          required
        />
        <MuiTextField
          label="Nom"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          fullWidth
          required
        />
        <MuiTextField
          label="Manager ID"
          type="number"
          value={form.managerId}
          onChange={(e) => setForm({ ...form, managerId: e.target.value })}
          fullWidth
          helperText="Saisissez l'ID du manager"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isPending}>
          {isPending ? "Création..." : "Créer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const InternList = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 2 }}
      >
        + Ajouter stagiaire rapide
      </Button>

      <List filters={internFilters} perPage={10}>
        <Datagrid rowClick="show">
          <TextField source="firstname" label="Prénom" />
          <TextField source="lastname" label="Nom" />
          <TextField source="email" label="Email" />
          <TextField source="department" label="Département" />
          <BooleanField source="isRemunerated" label="Rémunéré" />
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

      <QuickCreateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};