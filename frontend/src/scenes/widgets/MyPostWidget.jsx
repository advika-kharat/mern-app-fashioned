import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';



import {
    Box, Divider, Typography, InputBase,
    useTheme, Button, IconButton, useMediaQuery
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import WidgetWapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import UserImage from "components/UserImage";

const MyPostWidget = ({ picturePath }) => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const dispatch = useDispatch()
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("")
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNotMobileScreens = useMediaQuery("(min-width:1000px)")
    const medium = palette.grey.medium

    const handlePost = async () => {
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("caption", post)
        if (image) {
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }

        const response = await fetch(
            `http://localhost:3001/posts`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            }
        )

        const posts = await response.json()
        dispatch(setPosts({ posts }))
        setImage(null)
        setPost("")
    }

    return (
        <WidgetWapper  >
            <FlexBetween gap="0rem" mb="1rem">
                <UserImage image={picturePath} />
                <InputBase placeholder="Share your outfit!"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}


                    sx={{
                        width: "100%",
                        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

                        marginLeft: "1rem",
                        paddingLeft: "1rem",
                        marginRight: "1rem",
                        borderRadius: "10px",
                        fontSize: "1rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box mb="2rem">

                    <Dropzone
                        mb="1rem"
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>


                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Post</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {isImage && (
                                    <IconButton
                                        onClick={() => setImage(null)}

                                    >
                                        <DeleteOutlined paddingLeft="1rem " />

                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider />

            <FlexBetween
                mt="2rem"
            >



                <Button component="label" startIcon={<ImageOutlined />}
                    onClick={() => setIsImage(!isImage)}>
                    Upload Image

                </Button>


                <Button disabled={!post} onClick={handlePost} variant="contained">
                    POST
                </Button>




            </FlexBetween>
        </WidgetWapper>
    )

}


export default MyPostWidget