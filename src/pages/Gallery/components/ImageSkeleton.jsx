import { Box, Card, CardContent, CardCover, Typography } from '@mui/joy';
import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonCol = () => {
  return (
    <>
      <div className="col my-1 my-3">
        <Box component="ul" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 0, m: 0 }}>
          <Skeleton sx={{ borderRadius: 5 }} variant="rectangular" width={300} height={220}>
            <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
              <CardCover>
                <img loading="lazy" alt="" />
              </CardCover>
              <CardContent>
                <Typography level="h6" fontWeight="lg" textColor="#fff" mt={{ xs: 12, sm: 18 }}></Typography>
              </CardContent>
            </Card>
          </Skeleton>
        </Box>
      </div>
    </>
  );
};

const ImageSkeleton = () => {
  return (
    <>
      <div className="row row-cols-12 row-cols-md-3 row-cols-lg-4 my-3">
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
        <SkeletonCol />
      </div>
    </>
  );
};

export default ImageSkeleton;
