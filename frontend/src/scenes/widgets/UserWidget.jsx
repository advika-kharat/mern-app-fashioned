import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';

import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage"
import FlexBetween from "components/FlexBetween";
import WidgetWapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const locate = useLocation();
    const isHomePage = locate.pathname === "/home";
    const isProfilePage = locate.pathname.startsWith("/profile/");
    const [user, setUser] = useState(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}`,
            {
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

    if (!user) {
        return null
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user

    return (
        <WidgetWapper >
            {/*first row*/}
            <FlexBetween

                gap="1rem"
                mb={"1rem"}

            >
                <FlexBetween
                    gap="1rem"
                    justifyContent="space-between"
                >
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            fontWeight="bold"
                            fontSize="larger"
                            onClick={() => navigate(`/profile/${userId}`)}
                            sx={{
                                '&:hover': {
                                    cursor: "pointer"
                                }
                            }}>
                            {firstName} {lastName}
                        </Typography>

                        <Typography>
                            {friends.length} friends
                        </Typography>
                    </Box>
                    {/* <ManageAccountsOutlined onClick={() => navigate(`/profile/${userId}`)}
                        sx={{
                            '&:hover': {
                                cursor: "pointer"
                            }
                        }} /> */}

                </FlexBetween>

            </FlexBetween>
            <Divider />

            {/*second row*/}
            <Box p="1rem 0 ">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography
                        color={medium}
                    >
                        {location}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography
                        color={medium}
                    >
                        {occupation}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/*3rd row*/}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={main}>
                        Who's viewed your profile
                    </Typography>
                    <Typography color={main}>
                        10
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>
                        Impressions of your post
                    </Typography>
                    <Typography color={medium}>
                        13
                    </Typography>
                </FlexBetween>
            </Box>
            {isHomePage && (
                <>
                    <Divider mt="1rem" />
                    <Box p="1rem 0" alignItems={"center"}>
                        <FlexBetween>
                            <Button
                                onClick={() => navigate(`/profile/${userId}`)}
                                variant="outlined"
                                startIcon={<PersonIcon />}>
                                View Profile
                            </Button>
                        </FlexBetween>
                    </Box>
                </>
            )}




        </WidgetWapper >
    )

}

export default UserWidget