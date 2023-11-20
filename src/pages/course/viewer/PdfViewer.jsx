import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { Popup } from 'layout/Popup';
import LoadingComp from 'layout/loader/LoadingComp';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
// Plugins
const url = 'https://api.yuvamanthan.org/uploads/resource_library/communiquepccas.pdf';
function PdfViewer({ file, viewIndex, setViewIndex, series, postProgress, handleDir }) {
  const [pageNum, setPageNum] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loader, setLoader] = React.useState(true);
  function onDocumentLoadSuccess({ numPages }) {
    setLoader(false);
    setTotalPages(numPages);
    Popup();
  }
  // Next and Prev Toggler
  function toggleDir(atr) {
    if (atr == 'next') {
      if (pageNum < totalPages) {
        setPageNum(pageNum + 1);
      } else {
        onEndHandler();
        handleDir(atr);
      }
    } else if (atr == 'prev') {
      if (pageNum > 1) {
        setPageNum(pageNum - 1);
      } else {
        handleDir(atr);
      }
    }
  }
  // on End Handler
  const onEndHandler = () => {
    postProgress(series[viewIndex].seriesId);
  };
  const [FullScreen, SetFullScreen] = React.useState(false);
  function openFullscreen() {
    SetFullScreen(true);
    const elem = document.getElementById('myPdf');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  function closeFullscreen() {
    SetFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  React.useEffect(() => {
    if (loader) {
      Popup('loading');
    }
  }, []);
  // ({ loaded, total }) => alert('Loading a document: ' + (loaded / total) * 100 + '%');
  return (
    <div>
      <div className="border p-2" id="myPdf">
        <div className="d-flex align-items-center justify-content-center w-100">
          <Button className="text-capitalize" variant="outlined" color="warning" size="small" onClick={() => toggleDir('prev')}>
            Prev
          </Button>{' '}
          <div>
            <span className={`${FullScreen ? 'text-white' : 'text-dark'} mx-2`}>
              {pageNum}/{totalPages}
            </span>{' '}
          </div>
          <Button className="text-capitalize" variant="outlined" color="warning" size="small" onClick={() => toggleDir('next')}>
            Next
          </Button>
          {!FullScreen && (
            <Button onClick={openFullscreen}>
              <Fullscreen />
            </Button>
          )}
          {FullScreen && (
            <Button onClick={closeFullscreen}>
              <FullscreenExit />
            </Button>
          )}
        </div>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          // onLoadError={() => console.log("error")}
        >
          <Page pageNumber={pageNum} className={`w-100 ${FullScreen && 'fullscreen'}`} />
        </Document>
      </div>
    </div>
  );
}

export default PdfViewer;
