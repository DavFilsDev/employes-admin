import { useGetList } from "react-admin";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatCard = ({ title, value }: { title: string; value: number | undefined }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h3">{value ?? "..."}</Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmployees } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees } = useGetList("employees", {
    filter: { active: true },
    pagination: { page: 1, perPage: 1 },
  });

  const { total: totalInterns } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: remuneratedInterns } = useGetList("interns", {
    filter: { isRemunerated: true },
    pagination: { page: 1, perPage: 1 },
  });

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard title="Total employés" value={totalEmployees} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard title="Employés actifs" value={activeEmployees} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard title="Total stagiaires" value={totalInterns} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard title="Stagiaires rémunérés" value={remuneratedInterns} />
      </Grid>
    </Grid>
  );
};