import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Answers from '../Answers/Answers';
import { apiForum } from 'api';
import { Divider } from '@mui/material';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import Comment from '../Comments/Comment';
import '../../Forum.css';
import { CardOverflow, IconButton, Link, ListItemContent, ListItemDecorator, Input, Avatar } from '@mui/joy';
import { Face, Favorite } from '@mui/icons-material';
import CommentListItem from './components/CommentListItem';

export default function ViewComments({ layout, setLayout, commentList, id, itemType, setCommentLength }) {
  const [scroll, setScroll] = React.useState(true);
  const [comments, setComments] = useState([]);
  const { userData } = useGlobalContext();
  const formik = useFormik({
    initialValues: {
      email: userData?.email,
      questionId: itemType === 'question' ? id : undefined,
      answerId: itemType === 'answer' ? id : undefined,
      commentText: '',
    },
    onSubmit: async (values, action) => {
      try {
        const res = await apiForum.post(`/v1/api/comment`, values);
        if (res?.status === 201) {
          // navigate(0);
          action.resetForm();
          getComments();
          // getQuestions();
        }
      } catch (error) {}
    },
  });

  const getComments = async () => {
    // type: string |'answer'|'question
    try {
      const res = await apiForum.get(`/v1/api/comment?id=${id}&type=${itemType}`);
      if (res?.status === 200) {
        setComments(res?.data?.comments);
        setCommentLength(res?.data?.comments?.length);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setComments(commentList);
  }, []);

  return (
    <React.Fragment>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}>
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout} className="w-lg-50 ">
            <ModalClose />
            <Typography id="modal-dialog-overflow" component="h2">
              {/* Comments ({comments?.length}) */}
              {comments?.length ? 'Comments (' + comments?.length + ')' : 'Add comment'}
            </Typography>

            {scroll && (
              <>
                {/* <Link
                  component="button"
                  underline="none"
                  fontSize="sm"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  8.1M Likes
                </Link> */}

                {/* <Typography fontSize="sm">
                  <Link
                    component="button"
                    color="neutral"
                    fontWeight="lg"
                    textColor="text.primary"
                  >
                    MUI
                  </Link>{' '}
                  The React component library you always wanted
                </Typography>
                <Link
                  component="button"
                  underline="none"
                  fontSize="sm"
                  startDecorator="…"
                  sx={{ color: 'text.tertiary' }}
                >
                  more
                </Link> */}

                <List aria-labelledby="ellipsis-list-demo" sx={{ '--ListItemDecorator-size': '56px' }}>
                  {comments.map((comment) => {
                    return <CommentListItem key={comment.id} comment={comment} id={comment.id} />;
                  })}
                </List>

                {/* <Link
                  component="button"
                  underline="none"
                  fontSize="10px"
                  sx={{ color: 'text.tertiary', my: 0.5 }}
                >
                  2 DAYS AGO
                </Link> */}
                <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                  <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                    {/* <Face /> */}
                    <Avatar size="small" src={userData?.profile} style={{ height: '24px', width: '24px' }} />
                  </IconButton>
                  <Input
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
                    id="commentText"
                    name="commentText"
                    value={formik.values.commentText}
                    onChange={formik.handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        formik.handleSubmit();
                      }
                    }}
                  />
                  <Link disabled={formik?.values?.commentText ? false : true} underline="none" role="button" onClick={formik.handleSubmit}>
                    Post
                  </Link>
                </CardOverflow>
              </>
            )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
