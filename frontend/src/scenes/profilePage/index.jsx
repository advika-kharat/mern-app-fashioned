import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import FriendListWidget from "components/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import FlexBetween from "components/FlexBetween";


const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const isNotMobileScreens = useMediaQuery("(min-width:1000px)")

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        const data = await response.json()
        setUser(data)
        console.log(data)
    }

    useEffect(() => {
        getUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null

    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNotMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >
            <Box flexBasis={isNotMobileScreens ? "26%" : undefined}>
                <UserWidget
                    userId={userId}
                    picturePath={user.picturePath}
                />
                <FlexBetween mb="3rem"></FlexBetween>
                <FriendListWidget userId={userId} />
            </Box>

            <Box
                flexBasis={isNotMobileScreens ? "45%" : undefined}
                mt={isNotMobileScreens ? undefined : "2rem"}
            >

                <PostsWidget userId={userId} isProfile />

            </Box>




        </Box>
    );
}

export default ProfilePage
    ;