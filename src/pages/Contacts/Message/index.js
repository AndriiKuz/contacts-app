import Alert from '@mui/material/Alert';
export const Message = ({ severity, text }) => {
  return (
    <Alert variant="outlined" severity={severity}>
      {text}
    </Alert>
  );
};
