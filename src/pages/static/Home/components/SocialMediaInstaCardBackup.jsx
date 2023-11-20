import { Instagram } from '@mui/icons-material';
import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';

const SocialMediaInstaCard = ({ post, handleShare }) => {
  return (
    <>
      <div className="p-2">
        <Card key={post?.id} className="bg-light rounded-3 shadow">
          <a href={'https://www.instagram.com/yuvamanthan_org/?utm_source=ig_embed&ig_rid=ced01d1a-2369-426c-bc73-2f65638d6a4d'} target="_blank">
            <CardHeader
              avatar={<Avatar src="/images/yuva_logo.jpg"></Avatar>}
              title={post?.username}
              subheader={moment(post?.timestamp).format('MMMM Do YYYY')}
            />
          </a>
          <a href={post.permalink} target="_blank">
            <CardMedia component="img" height="194" className="my-2" image={post.media_url} alt="Paella dish" />
          </a>

          <CardContent>
            <Typography
              className="my-2"
              sx={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 5,
              }}
              variant="body2"
              color="text.secondary">
              {post.caption}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon onClick={(e) => (e.currentTarget.style.color = 'red')} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon onClick={() => handleShare(post.permalink)} />
            </IconButton>
            <IconButton aria-label="goto">
              <a href={post.permalink} target="_blank">
                <Instagram />
              </a>
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default SocialMediaInstaCard;
