import { ChatBubbleOutlineOutlined, ShareOutlined } from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { Box } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useNavigate } from "react-router-dom";

const PostWidget = (
    {
        postId,
        postUserId,
        name,
        caption,
        picturePath,
        userPicturePath,
        likes,
        unlikes,
        comments,
    }
) => {

    const [isComments, setIsComments] = useState(false)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = likes ? Boolean(likes[loggedInUserId]) : false
    const isUnliked = unlikes ? Boolean(likes) : false
    const likeCount = likes ? Object.keys(likes).length : 0
    const unlikeCount = unlikes ? Object.keys(unlikes).length : 0
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()

    const patchLikes = async () => {
        if (likes) {
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: loggedInUserId
                })
            })
            const updatedPost = await response.json()
            dispatch(setPost({ post: updatedPost }))
        }
    }

    const patchUnlikes = async () => {
        if (unlikes) {
            const response = await fetch(`http://localhost:3001/posts/${postId}/unlike`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: loggedInUserId
                })
            })
            const updatedPost = await response.json()
            dispatch(setPost({ post: updatedPost }))
        }
    }

    return (
        <WidgetWapper m="2rem 0"

        >
            <Friend
                friendId={postUserId}
                name={name}
                userPicturePath={userPicturePath}


            />

            <Box mt="1rem"></Box>



            {picturePath && (
                <img width="100%"


                    height="auto"
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <Typography
                margin="1rem 0"
                padding="2px"
                backgroundColor="pink.200"
                fontSize="1rem"

            > <b>{name}</b> {caption}</Typography>



            {/* like and unlikes */}
            <Box display={"flex"} justifyContent={"space-between"}
                padding="0.2rem"
            >
                <FlexBetween>
                    <IconButton onClick={patchLikes}>
                        {isLiked ? (
                            <ThumbUpAltIcon />
                        ) : (
                            <ThumbUpOffAltIcon />
                        )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <IconButton onClick={patchUnlikes}>
                        {isUnliked ? (
                            <ThumbDownOffAltIcon />
                        ) : (
                            <ThumbDownAltIcon />
                        )}
                    </IconButton>
                    <Typography>{unlikeCount}</Typography>
                </FlexBetween>
            </Box>



        </WidgetWapper>
    )



}

export default PostWidget