import { Alert, Avatar, Button, Divider, Grid, Paper } from '@mui/material';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from 'global/context';
import { Face, Send, Try } from '@mui/icons-material';
import { apiJsonAuth } from 'api';
import { minHeight } from '@xstyled/styled-components';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@mui/joy';
const emojis = [
  '😀', // Grinning Face
  '👍', // Thumbs Up
  '🎓', // Graduation Cap
  '🏫', // School Building
  '📚', // Books
  '🎉', // Party Popper
  '✨', // Sparkles
  '🌟', // Star
  '🤔', // Thinking Face
  '📝', // Memo
];
function CommentBox({ img }) {
  const navigate = useNavigate();
  const { userData, token, loginStatus } = useGlobalContext();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (img?.id) {
      fetchComments();
    }
  }, [img]);
  function fetchComments() {
    apiJsonAuth
      .get('content/gallery-comment?id=' + img?.id)
      .then((res) => {
        // console.log(res);
        setComments(res.data?.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="">
      {userData?.id ? (
        <div className="py-3">
          <CommentTextarea userData={userData} img={img} comments={comments} fetchComments={fetchComments} />
        </div>
      ) : (
        <div className="p-3">
          <Button
            variant="contained"
            size="lg"
            fullWidth
            sx={{ padding: 2 }}
            onClick={() => {
              navigate('/login');
            }}
            data-bs-dismiss="modal"
            aria-label="Close"
            color="warning"
            startIcon={<Face />}>
            LogIn to add your views
          </Button>
        </div>
      )}
      <Divider variant="fullWidth" size="lg" />
      <Paper
        className="scroll-minibar scrollbar-none::-webkit-scrollbar"
        style={{
          height: '60vh',
          overflow: 'auto',
          boxShadow: 'none',
          scrollbarWidth: '2px',
          WebkitOverflowScrolling: '',
        }}>
        {comments?.length ? (
          comments.map((comment, index) => (
            <div key={index}>
              <Grid container wrap="nowrap" marginTop={1} spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src={comment?.profile} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h6 style={{ margin: 0, textAlign: 'left' }}>{comment?.first_name}</h6>
                  <p className="lh-1 m-1">
                    <small className="fs-7" style={{ textAlign: 'left' }}>
                      {comment?.comment}
                    </small>
                  </p>

                  <small style={{ textAlign: 'left', color: 'gray' }}>{moment(comment.createdAt).fromNow()}</small>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" size="sm" />
            </div>
          ))
        ) : (
          <Card className="text-center text-dark">
            <CardContent className="">
              <Try sx={{ marginX: 'auto', fontSize: 50 }} color="info" />
              <Typography variant="h5" component="h2">
                Be the first to comment
              </Typography>
              <Typography variant="body1">Start the conversation and share your thoughts.</Typography>
            </CardContent>
          </Card>
        )}
      </Paper>
    </div>
  );
}

export default CommentBox;
function CommentTextarea({ img, comments, fetchComments, userData }) {
  const [text, setText] = React.useState('');
  useEffect(() => {}, [userData]);
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  function postComment() {
    if (text && img?.id && userData?.id) {
      apiJsonAuth
        .post('content/gallery-comment?id=' + img?.id, {
          studentId: userData?.id,
          comment: text,
          role: userData?.role,
        })
        .then((res) => {
          fetchComments();
          setText('');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast.warning('Enter Comments!!');
    }
  }
  return (
    <Box className="">
      <Grid container wrap="wrap" spacing={2}>
        <Grid item>
          <Avatar alt={userData?.first_name} src={userData?.profile || userData?.logo} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Textarea
            size="sm"
            placeholder="Type in here…"
            value={text}
            onChange={(event) => setText(event.target.value)}
            minRows={2}
            maxRows={5}
            startDecorator={
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {emojis.map((emoji) => (
                  <IconButton size="sm" variant="outlined" color="neutral" onClick={addEmoji(emoji)}>
                    {emoji}
                  </IconButton>
                ))}
              </Box>
            }
            endDecorator={
              <>
                <Typography level="body3" sx={{ mr: 'auto', my: 'auto' }}>
                  {text?.length} character(s)
                </Typography>
                <IconButton size="sm" sx={{ ml: 'auto', my: 'auto' }} variant="text" onClick={postComment}>
                  <Send />
                </IconButton>
              </>
            }
            sx={{ minWidth: 300 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
