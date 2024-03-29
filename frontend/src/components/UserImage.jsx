import { Box } from "@mui/material";

const UserImage = ({ image, size = "50px" }) => {
    return (
        <Box width={size} heigh={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage