import { Box, Typography } from "@mui/material";
import ForFriendList from "./ForFriendList";
import WidgetWapper from "./WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)

    // const getFriends = async () => {
    //     const response = await fetch(
    //         `http://localhost:3001/users/${userId}/friends`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     )
    //     const data = await response.json()
    //     dispatch(setFriends({ friends: data }))
    // }

    const getFriends = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/users/${userId}/friends`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (Array.isArray(data)) {
                dispatch(setFriends({ friends: data }));
            } else {
                console.error("Invalid data format. Expected an array.");
            }
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };


    useEffect(() => {
        getFriends()
    }, [])//eslint-disable-line react-hooks/exhaustive-deps


    return (
        <WidgetWapper mt="-2rem !important" >
            <Typography variant="h5" sx={{ mb: "1.5rem" }}>
                Your Friends
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
                {Array.isArray(friends) && (
                    friends.map((friend) => (
                        <>
                            <ForFriendList
                                key={friend._id}
                                userId={friend._id}
                                name={`${friend.firstName} ${friend.lastName}`}
                                subtitle={friend.occupation}
                                userPicturePath={friend.picturePath}

                            />
                            < Divider />
                        </>

                    ))


                )}
            </Box>

        </WidgetWapper>
    )
}

export default FriendListWidget