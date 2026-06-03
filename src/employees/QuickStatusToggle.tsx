import { useRecordContext, useUpdate } from "react-admin";
import { Button } from "@mui/material";

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update(
      "employees",
      {
        id: record.id,
        data: { active: !record.active },
        previousData: record,
      },
      { mutationMode: "optimistic" }
    );
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      color={record.active ? "error" : "success"}
      size="small"
      variant="outlined"
    >
      {record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};