import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    TextField,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Box,
    CircularProgress,
  } from '@mui/material';

const Story = ({ data }) => {
    return (
      <Card className="story-card">
        <CardMedia
          component="img"
          height="100"
          image={data.imageUrl}
          alt={data.imageAltText}
        />
        <Typography variant="caption" align="center">
          {data.userName}
        </Typography>
      </Card>
    );
  };

  export default Story