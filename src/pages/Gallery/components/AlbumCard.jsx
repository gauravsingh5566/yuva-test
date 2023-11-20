import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export default function AlbumCard({ album }) {
  return (
    <Card sx={{ minHeight: '380px' }} className="shadow w-100 rounded-3">
      <CardCover>
        <img
          srcSet={album?.logo}
          //   srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1} className="bg-success  bg-opacity-75">
          <span className=" p-2 px-2 d-inline rounded-pill lh-lg">{album?.institution_name}</span>
        </Typography>
        <Typography level="h4" fontSize="md" textColor="#fff" mb={1}>
          {album?.theme}
        </Typography>
        <Typography startDecorator={<LocationOnRoundedIcon />} textColor="neutral.300">
          {album?.state}
          {album?.district && ', ' + album?.district}
        </Typography>
      </CardContent>
    </Card>
  );
}
