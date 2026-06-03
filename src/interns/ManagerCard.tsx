import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography, Chip, CircularProgress } from "@mui/material";

export const ManagerCard = () => {
  const intern = useRecordContext();

  const { data, isPending, error } = useGetOne(
    "employees",
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  if (isPending) return <CircularProgress />;
  if (error) return <Typography color="error">Erreur : manager introuvable.</Typography>;
  if (!data) return null;

  return (
    <Card variant="outlined" sx={{ mt: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6">Manager</Typography>
        <Typography>
          {data.firstname} {data.lastname}
        </Typography>
        <Typography color="text.secondary">{data.department}</Typography>
        <Typography>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </Typography>
        <Chip
          label={data.active ? "Actif" : "Inactif"}
          color={data.active ? "success" : "default"}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};