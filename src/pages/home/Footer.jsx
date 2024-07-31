import {
    Typography,
    Box,
  } from '@mui/material';

const Footer = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={2}>
        <Typography variant="body2" color="textSecondary">
          © 2023 Instagram
        </Typography>
      </Box>
    );
  };

  export default Footer