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
    <Card key={post?.id} className="bg-white shadow-lg p-0 card-social">
      <a href={'https://www.instagram.com/yuvamanthan_org/?utm_source=ig_embed&ig_rid=ced01d1a-2369-426c-bc73-2f65638d6a4d'} target="_blank">
        <CardHeader
          className="text-dark p-2 border-bottom"
          avatar={<Avatar src="/images/yuva_logo.jpg"></Avatar>}
          title={post?.username}
          subheader={moment(post?.timestamp).format('MMMM Do YYYY')}
        />
      </a>
      <a href={post.permalink} target="_blank">
        <CardMedia component="img" image={post.media_url} alt="Paella dish" />
      </a>
      <CardActions className="p-2 border-top">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={(e) => (e.currentTarget.style.color = 'red')} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon onClick={() => handleShare(post.permalink)} className="text-dark" />
        </IconButton>
        <IconButton aria-label="goto">
          <a href={post.permalink} target="_blank">
            <Instagram className="text-dark" />
          </a>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SocialMediaInstaCard;
