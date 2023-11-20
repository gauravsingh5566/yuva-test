import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { AspectRatio, CardOverflow } from '@mui/joy';

export default function GalleryCard({ index, album, setError }) {
  return (
    <Card sx={{ minHeight: '280px', width: 320 }}>
      <CardCover>
        <img
          src={album?.img}
          onError={(e) => {
            setError((prv) => [...prv, index]);
          }}
          srcSet={album?.img}
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover />
      {/* <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography
          level="h2"
          fontSize="lg"
          textColor="#fff"
          mb={1}
        ></Typography>
        <Typography
          startDecorator={<LocationOnRoundedIcon />}
          textColor="neutral.300"
        ></Typography>
      </CardContent> */}
    </Card>
  );
}
