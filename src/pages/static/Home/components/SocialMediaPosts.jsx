import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SocialMediaInstaCard from './SocialMediaInstaCard';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
function SocialMediaPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const userAccessToken =
          'IGQVJWSS1obDBmb3l1SmtUeU5selItdWQ3QW52ZATVsLU1Yd0ZA5cUJxTEZAxSVR3cEh6UWM1Q29pa2VLYlhHYTZAJTGZAFYk5Dd2RIdG1uY3Y5cFFfSklOZAGNIMGxFRHlZATm9SdUpILTdLcFpNRDhQbmtuQQZDZD'; // Replace with your user access token
        const limit = 10; // Number of posts to fetch

        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,timestamp,permalink,media_type,username,media_url&access_token=${userAccessToken}&limit=${limit}`
        );

        const { data } = response.data;
        setPosts(data);
        window.localStorage.InstagramPostsList = JSON.stringify(data);
      } catch (error) {
        console.error('Errorfetching Instagram posts:', error);
      }
    };
    // if (!window.localStorage?.InstagramPostsList) {
    fetchInstagramPosts();
    // } else {
    //   setPosts(JSON.parse(window.localStorage?.InstagramPostsList));
    // }
  }, []);
  const handleShare = async (permalink) => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: permalink,
        });
      } else {
        // Fallback behavior if Web Share API is not supported
        alert('Sharing is not supported on this device or browser.');
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };
  return (
    <div className="bg-success eventsbg py-5">
      <div className="container insta-feeds" hidden={!posts.length}>
        <div className="col-12 col-lg-8">
          <h2 className="text-white fs-1">
            What is <span className="text-warning">happening around</span>
          </h2>
          <img
            src="https://demo.xpeedstudio.com/evenex/multi-event/wp-content/uploads/sites/13/2021/02/header-line.png"
            className="attachment-large size-large"
            alt=""
            loading="lazy"
            width="92"
            height="12"></img>
          <p className="text-white">
            Stay updated on the latest G20 buzz. Read our collection of stories, guest articles, features on trending topics such as youth culture,
            climate change, sustainability, macroeconomics and more.
          </p>
        </div>
        <div className="p-relative w-100">
          <div className="swiper-button image-swiper-button-next p-absolute" style={{ top: '50%', right: '0px', zIndex: 300 }}>
            <IconButton className="bg-success text-white">
              <ArrowForwardIos />
            </IconButton>
          </div>
          <div className="swiper-button image-swiper-button-prev p-absolute" style={{ top: '50%', left: '0px', zIndex: 300 }}>
            <IconButton className="bg-success text-white">
              <ArrowBackIosNew />
            </IconButton>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={true}
            breakpoints={{
              740: {
                slidesPerView: 2,
              },
              1240: {
                slidesPerView: 3,
              },
            }}
            style={{ overflow: 'visible' }}
            navigation={{
              nextEl: '.image-swiper-button-next',
              prevEl: '.image-swiper-button-prev',
              disabledClass: 'swiper-button-disabled',
            }}
            modules={[Navigation]}>
            {posts?.map((post, index) => {
              if (post?.media_type === 'CAROUSEL_ALBUM' || post?.media_type === 'IMAGE')
                return (
                  <>
                    <SwiperSlide key={index} className="py-4">
                      <SocialMediaInstaCard post={post} handleShare={handleShare} />
                    </SwiperSlide>
                  </>
                );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaPosts;
