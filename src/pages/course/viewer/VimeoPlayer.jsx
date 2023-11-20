import React, { useState } from 'react';
import YouTube from 'react-youtube';
const VimeoPlayer = ({ videoId, viewIndex, setViewIndex, handleDir, series, postProgress, progress }) => {
  const [canNext, setCanNext] = useState(true);
  const onEndHandler = () => {
    if (canNext) {
      handleDir('next');
    }
    postProgress(series[viewIndex].seriesId);
  };
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: true,
    },
  };
  return (
    <>
      <div className="theatre">
        <YouTube
          videoId={videoId}
          autoplay={true}
          opts={opts}
          className="vedio-container"
          // onReady={() => setLoader(false)}
          onEnd={onEndHandler}
        />
        {/* <Player
          video={videoId}
          controls
          autoplay
          onLoaded={() => setLoader(false)}
          responsive={true}
          onEnd={()=>console.log("%c ENded")}
          pip={false}
        /> */}
      </div>

      {/* Buttons  */}
      {/* <div>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <Button
            sx={{
              position: "absolute",
              top: "45%",
              left: "0",
              py: 1,
              px: 0,
              ml: 1,
            }}
            variant={"outlined"}
            size={"small"}
            color={"warning"}
            disabled={viewIndex === 0}
            onClick={() => setViewIndex(viewIndex - 1)}
          >
            <ArrowBackIosTwoTone />
          </Button>
          <Button
            sx={{
              position: "absolute",
              top: "45%",
              right: "0",
              py: 1,
              px: 0,
              mr: 1,
            }}
            variant={"outlined"}
            size={"small"}
            color={"warning"}
            onClick={() => {
              if (viewIndex === series.length - 1) {
                // setCertificateDownloadable(true);
              } else {
                setViewIndex(viewIndex + 1);
              }
            }}
          >
            <ArrowForwardIosTwoTone />
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default VimeoPlayer;
