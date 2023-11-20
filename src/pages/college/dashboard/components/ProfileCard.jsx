import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { Skeleton, Tooltip } from '@mui/material';
import QRCode from 'qrcode.react';
import SharePopup from './SharePopup';
import poster from './asset/poster.png';
import LoadingButton from '@mui/lab/LoadingButton';
import { CheckCircle, HelpCenterOutlined } from '@mui/icons-material';
import NewWindow from 'react-new-window';
import PosterDownload from 'lib/PosterDownload';
import moment from 'moment';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const LinkComponent = ({ link, heading, loading }) => {
  const [copiedLink, setCopiedLink] = React.useState(false);
  React.useEffect(() => {
    const TimeOut = setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
    return () => {
      clearTimeout(TimeOut);
    };
  }, [copiedLink]);

  return (
    <>
      {loading ? (
        <Skeleton className="m-0 p-4 w-100 mt-1" />
      ) : (
        <div className="mt-2 m-0">
          <p className="text-dark fs-6 mb-0">{heading}</p>
          <div
            className="p-2 bg-light rounded-0 overflow-hidden text-wrap lh-sm text-start d-flex align-items-center justify-content-between w-100"
            style={{ border: '2px dashed darkgray' }}>
            <small className="text-wrap w-75" style={{ wordWrap: 'break-word' }}>
              {link}
            </small>
            <LoadingButton
              loading={link?.includes('undefined')}
              loadingPosition="end"
              variant="outlined"
              className="px-2 py-1 border-2 rounded-0"
              color={copiedLink ? 'success' : 'warning'}
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopiedLink(true);
              }}
              startIcon={!copiedLink ? <ContentCopyIcon /> : <CheckCircle />}>
              {copiedLink ? <small>COPIED</small> : <small>COPY</small>}
            </LoadingButton>
          </div>
        </div>
      )}
    </>
  );
};

export default function ProfileCard({ details, shareableLink, affiliated, loading }) {
  const [open, setOpen] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedLinkEco, setcopiedLinkEco] = React.useState(false);
  let [shareableLinkEco, setShareableLinkEco] = React.useState(
    `${process.env.REACT_APP_MAIN_URL || 'https://www.yuvamanthan.org/'}${details?.club}/${details?.slug}`
  );

  React.useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  }, [copiedLink]);
  React.useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      setcopiedLinkEco(false);
    }, 2000);
  }, [copiedLinkEco]);

  React.useEffect(() => {
    setShareableLinkEco(`${process.env.REACT_APP_MAIN_URL || 'https://www.yuvamanthan.org/'}${details?.club}/${details?.slug}`);
  }, [details]);

  const [qrurl, setqrurl] = React.useState('');
  const [show, setShow] = React.useState(false);
  const DownloadQR = () => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    setqrurl(pngUrl);
    if (show) {
      setShow(false);
      setTimeout(() => {
        setShow(true);
      }, 500);
    } else {
      setShow(true);
    }
  };
  function DownloadOldQR() {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'registerqrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const [value, setValue] = React.useState('student');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabsArray = [
    {
      label: 'student',
      value: 'student',
      link: '',
    },
    {
      label: 'teacher',
      value: 'teacher',
      link: '?type=teacher',
    },
  ];
  return (
    <>
      <Card variant="outlined" className="rounded-2 p-0 shadow-sm text-center">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" className='row'>
                {tabsArray?.map((tabBtn, i) => {
                  return <Tab className='col' label={tabBtn?.label} value={tabBtn?.value} key={i} />;
                })}
              </TabList>
            </Box>
            {tabsArray?.map((tabPan, i) => {
              return (
                <TabPanel value={tabPan?.value} className="p-0">
                  <CardContent className="m-0 pb-0">
                    {' '}
                    <p className="fs-6 lh-sm fw-semibold">
                      Please share this QR Code{' '}
                      <Tooltip title="WHAT IS THIS? - This QR Code should go on all your event promotion collaterals like Posters, Banners, WhatsApp images etc. Scanning this QR Code generates a unique joining link which takes the students to their registration page.">
                        <HelpCenterOutlined />
                      </Tooltip>{' '}
                      <br /> with the students to make them participate.&nbsp;
                    </p>
                    <p className="fs-6 lh-sm">
                      {' '}
                      You can also click on the COPY LINK button to copy the URL and share the same with the students to make them register.
                    </p>
                  </CardContent>
                  {show && (
                    <NewWindow>
                      <PosterDownload
                        setShow={setShow}
                        qrcodeimg={qrurl}
                        event_date={details?.appointment_date ? 'Summit Date : ' + moment(details?.appointment_date).format('DD-MM-YYYY') : ''}
                        link={shareableLink}
                        image={poster}
                        name={details?.institution_name}
                        addline1={details?.institution_address ? details?.institution_address : ''}
                        addline2={`${details?.district ? details?.district + ',' : ''} ${details?.state ? details?.state + '-' : ''} ${
                          details?.pincode ? details?.pincode : ''
                        }`}
                      />
                    </NewWindow>
                  )}
                  {!loading ? (
                    <QRCode
                      className="py-0 my-0"
                      id="qrcode"
                      value={shareableLink + tabPan?.link}
                      size={320}
                      includeMargin={true}
                      level={'H'}
                      bgColor={'#ffffff'}
                    />
                  ) : (
                    <Skeleton className="m-auto" variant="rectangular" width={320} height={320} />
                  )}
                  <LinkComponent link={shareableLink + tabPan?.link} heading={`Registration Link for ${tabPan?.label}`} loading={loading} />
                  {details?.club && <LinkComponent link={shareableLinkEco} heading={'Club Link for Registeration'} loading={loading} />}
                  <CardActions className="d-block text-start">
                    <div className="d-flex w-100 align-items-center justify-content-center flex-wrap">
                      <LoadingButton
                        loading={loading}
                        loadingPosition="end"
                        variant="outlined"
                        size="small"
                        color="success"
                        className="py-2 rounded-3 px-3 m-1"
                        onClick={DownloadOldQR}
                        endIcon={<DownloadIcon />}>
                        DOWNLOAD QR CODE
                      </LoadingButton>
                      <LoadingButton
                        loading={loading}
                        loadingPosition="end"
                        variant="outlined"
                        size="small"
                        color="success"
                        className="py-2 rounded-3 px-3 m-1"
                        onClick={DownloadQR}
                        endIcon={<DownloadIcon />}>
                        DOWNLOAD QR CREATIVE
                      </LoadingButton>

                      <LoadingButton
                        loading={loading}
                        loadingPosition="end"
                        variant="outlined"
                        size="small"
                        className="py-2 rounded-3 px-3 m-1"
                        onClick={() => setOpen(true)}
                        endIcon={<SendIcon />}>
                        SHARE
                      </LoadingButton>
                    </div>
                  </CardActions>
                </TabPanel>
              );
            })}
          </TabContext>
        </Box>
      </Card>
      <SharePopup shareableLink={shareableLink} institution_name={details?.institution_name} open={open} setOpen={setOpen} />
    </>
  );
}
