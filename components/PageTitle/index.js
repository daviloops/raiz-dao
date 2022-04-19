import Typography from '@mui/material/Typography';

export default function PageTitle({ children }) {
  return (
    <Typography variant="h4" color="primary.main">
      {children}
    </Typography>
  );
}
