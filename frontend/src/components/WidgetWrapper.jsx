import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    margin: "auto", // Center horizontally
    [theme.breakpoints.down('sm')]: {
        // Apply styles for screens smaller than or equal to 'sm'
        // Center text 
        maxWidth: "90%",
        marginLeft: "auto",
        marginRight: "auto"

    },
    marginBottom: "1rem",
    minWidth: "25vw",
    maxWidth: "30vw"
}));

export default WidgetWrapper;
