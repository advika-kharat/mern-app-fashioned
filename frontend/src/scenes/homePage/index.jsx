import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "components/FriendListWidget";
import WidgetWrapper from "components/WidgetWrapper";



const HomePage = () => {
    const isNotMobileScreens = useMediaQuery("(min-width:1000px)")
    const { _id, picturePath } = useSelector((state) => state.user)

    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNotMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNotMobileScreens ? "20% !important" : undefined}>
                <UserWidget
                    userId={_id}
                    picturePath={picturePath}
                />
                <WidgetWrapper>
                    <img src="https://i.ibb.co/PGqwG4m/1.jpg" width="100%"
                        sx={{
                            objectFit: "cover"
                        }} />
                </WidgetWrapper>

            </Box>


            <Box
                flexBasis={isNotMobileScreens ? "42% !important" : undefined}
                mt={isNotMobileScreens ? undefined : "2rem"}
            >
                <MyPostWidget picturePath={picturePath} />
                <PostsWidget userId={_id} picturePath={picturePath} />

            </Box>

            <Box>
                {isNotMobileScreens && (
                    <Box flexBasis="20% !important">
                        <Box m="2rem 0">
                            <FriendListWidget
                                userId={_id}

                            />
                        </Box>
                        <WidgetWrapper>
                            <img src="https://i.ibb.co/kJ37nVB/3.jpg" width="100%"
                                sx={{
                                    objectFit: "cover"
                                }} />
                        </WidgetWrapper>

                    </Box>

                )}

            </Box>


        </Box>
    );
}

export default HomePage
