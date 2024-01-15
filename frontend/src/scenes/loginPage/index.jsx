import {
    Box, Typography, useTheme, useMediaQuery
} from "@mui/material";
import Form from "./Form";
import Slideshow from "components/Slideshow";




const LoginPage = () => {
    const { palette } = useTheme()
    const isNotMobileScreens = useMediaQuery("(min-width:1000px)")

    return (
        <div>

            <Box
                width={isNotMobileScreens ? "70%" : "80%"}
                margin="3rem auto auto auto"

                height="fit-content"
                paddingBottom="2rem"
                marginBottom="100px"
                borderRadius="10px"
                backgroundColor="white"
            >

                {!isNotMobileScreens && (
                    <Typography
                        fontFamily="Poppins"
                        textAlign="center"
                        fontWeight="900"
                        fontSize="2rem"
                        marginBottom="-5rem"
                        paddingTop="1rem"
                        color="blue"
                        maxWidth="90%"
                        marginLeft="auto"
                        marginRight="auto"


                    > Dive into the world of fashion</Typography>
                )}




                <Box display="flex" justifyContent="center" verticalAlign="middle" >
                    {isNotMobileScreens && (<Slideshow />)}


                    <Form />

                </Box>



            </Box>

        </div >
    );
}

export default LoginPage;