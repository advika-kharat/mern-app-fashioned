import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import WidgetWapper from "./WidgetWrapper";
import { Button } from "@mui/material";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const notUser = !(_id === friendId)

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
                        onClick={() => {
                            navigate(`/profile/${friendId}`)
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography>{subtitle}</Typography>
                </Box>
            </FlexBetween>

            <FlexBetween>
                {notUser ? (
                    <Button
                        variant="outlined"
                        startIcon={isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
                        onClick={() => patchFriend()}
                    >
                        {isFriend ? "Remove Friend" : "Add Friend"}
                    </Button>
                ) : (
                    <Typography
                        fontWeight="bold"
                        color="pink"
                    >Me</Typography>
                )}

                <Divider />
            </FlexBetween>
        </FlexBetween>
    );
};

export default Friend;
