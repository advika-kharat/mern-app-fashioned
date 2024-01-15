import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import WidgetWapper from "./WidgetWrapper";
import { Button } from "@mui/material";

const ForFriendList = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween width="100%" justifyContent="space-between" alignItems="center">
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} />
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            '&:hover': {
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography>{subtitle}</Typography>
                </Box>
            </FlexBetween>



            <Divider />
        </FlexBetween>
    );
};

export default ForFriendList;
