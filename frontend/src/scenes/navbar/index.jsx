import { useState } from "react";
import {
    Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery
} from '@mui/material'
import {
    Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import "../../assets/fonts.css"

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const isNotMobileScreens = useMediaQuery("(min-width:1000px)")
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light
    const alt = theme.palette.background.alt


    let fullName = "User"
    let name = ""
    if (user) {
        name = `${user.firstName} ${user.lastName}`
    }
    if (name) {
        fullName = name
    }


    return (
        <FlexBetween padding="1rem 6%"


            maxWidth="80%" marginTop="2rem"
            marginLeft="auto" mr="auto"
            borderRadius="30px"
            sx={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                background: "rgba(255, 255, 255, 0.655);",
                backdropFilter: "blur(20px)"

            }}



        >
            <FlexBetween gap="1.75rem">
                <Typography fontWeight="800" fontSize="clamp(1rem,2rem,2.25rem)"
                    onClick={() => navigate("/home")}
                    fontFamily="Poppins"

                    sx={{
                        '&:hover': {
                            opacity: "80%",
                            cursor: 'pointer'
                        },
                        background: "-webkit-linear-gradient(45deg, #E536AB 30%, #04FDC7 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",

                    }}
                >
                    fashioned
                </Typography>
                {isNotMobileScreens && (
                    <FlexBetween backgroundColor="white" borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem"
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                        }}
                    >
                        <InputBase placeholder="search..." />
                        <IconButton><Search /></IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {isNotMobileScreens ? (
                <FlexBetween gap="1rem">

                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>


                        </Select>
                    </FormControl>

                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}

            {!isNotMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    borderRadius="20px"
                    top="0rem"
                    height="fit-content"
                    zIndex="10"
                    maxWidth="450px"
                    minWidth="100px"
                    backgroundColor="white"
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>


                </Box>

            )}

        </FlexBetween>
    );
}

export default Navbar
    ;