import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Cancel, CheckRounded, CopyAll } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const SharePopup = ({ shareableLink, institution_name, setOpen, open }) => {
  const sharingContent =
    'Dear Student! The much anticipated Yuvamanthan Model G20 Summit (YMG20) is finally happening in ' +
    institution_name +
    " . In this simulation of the actual G20 summit, you can participate as a Prime Minister, Finance Minister, Foreign Minister or a Sherpa of any G20 nation for a day! It’s one action-packed event full of debating, discussing, voting and consensus-building. You will be creating an action plan for real-world issues. What's more, your ideas will be shared with policymakers. Exciting right? Don't wait and click on the link below to register: " +
    shareableLink +
    ' All the best! P.S. Don’t forget to complete the short G20 Orientation Course. It’s critical for your participation and you will receive a certificate.';

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, [1000]);
  }, [copied]);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <IconButton onClick={() => setOpen(false)} style={{ position: 'absolute', right: 0 }}>
        <Cancel />
      </IconButton>
      <DialogTitle>
        <span className="font-ubd fs-6">Copy Text and Share on Social Handles</span> <br />
      </DialogTitle>
      <DialogContent>
        <div>
          <div className="p-3 bg-light rounded-0" style={{ border: '2px dashed darkgray' }}>
            <small>{sharingContent}</small>
          </div>
          <Button
            variant="outlined"
            color={copied ? 'success' : 'warning'}
            size="small"
            className="rounded-0"
            onClick={() => {
              navigator.clipboard.writeText(sharingContent);
              setCopied(true);
            }}>
            {!copied ? (
              <>
                <CopyAll sx={{ fontSize: '18px' }} /> Copy
              </>
            ) : (
              <>
                <CheckRounded sx={{ fontSize: '18px' }} /> Copied
              </>
            )}
          </Button>
        </div>
        <div className="mt-4">
          <p className="fs-6">Click this Social Media Icons to Share On your handles</p>
          <EmailShareButton
            subject="Model G20 India Yuvamanthan is being organised in our institute."
            url={
              'Dear Student! The much anticipated Yuvamanthan Model G20 Summit (YMG20) is finally happening in ' +
              institution_name +
              " . In this simulation of the actual G20 summit, you can participate as a Prime Minister, Finance Minister, Foreign Minister or a Sherpa of any G20 nation for a day! It’s one action-packed event full of debating, discussing, voting and consensus-building. You will be creating an action plan for real-world issues. What's more, your ideas will be shared with policymakers. Exciting right? Don't wait and click on the link below to register: " +
              shareableLink +
              ' All the best! P.S. Don’t forget to complete the short G20 Orientation Course. It’s critical for your participation and you will receive a certificate.'
            }
            quote={'Model g20 India'}
            className="m-1">
            <EmailIcon size={42} round />
          </EmailShareButton>
          {/* <FacebookShareButton
            url={"Hey!, " + institution_name + " is organising the YMG20 Summit, where you can participate as a Prime Minister, Finance Minister, Foreign Minister, Sherpa, or advisor! You can contribute your ideas for the betterment of the world. Participate now in this exciting one-day event by scanning click the link below!   " + shareableLink}
            quote={"Model G20 India Yuvamanthan is being organised in our institute."}
            hashtag={"#YuvaManthan #ModelG20India #G20 #India #Summit #Y20 #Awareness #Education #Students #Youth #SocialImpact"}
            className="m-1"
          >
            <FacebookIcon size={42} round />
          </FacebookShareButton> */}
          <TwitterShareButton
            url={
              'Dear Student! The much anticipated Yuvamanthan Model G20 Summit (YMG20) is finally happening in ' +
              institution_name +
              " . In this simulation of the actual G20 summit, you can participate as a Prime Minister, Finance Minister, Foreign Minister or a Sherpa of any G20 nation for a day! It’s one action-packed event full of debating, discussing, voting and consensus-building. You will be creating an action plan for real-world issues. What's more, your ideas will be shared with policymakers. Exciting right? Don't wait and click on the link below to register: " +
              shareableLink +
              ' All the best! P.S. Don’t forget to complete the short G20 Orientation Course. It’s critical for your participation and you will receive a certificate.'
            }
            className="m-1">
            <TwitterIcon size={42} round />
          </TwitterShareButton>
          {/* <LinkedinShareButton
            url={"Hey!, " + institution_name + " is organising the YMG20 Summit, where you can participate as a Prime Minister, Finance Minister, Foreign Minister, Sherpa, or advisor! You can contribute your ideas for the betterment of the world. Participate now in this exciting one-day event by scanning click the link below!   " + shareableLink}
            quote={"Model g20 India"}
            className="m-1"
          >
            <LinkedinIcon size={42} round />
          </LinkedinShareButton> */}
          <WhatsappShareButton
            url={
              'Dear Student! The much anticipated Yuvamanthan Model G20 Summit (YMG20) is finally happening in ' +
              institution_name +
              " . In this simulation of the actual G20 summit, you can participate as a Prime Minister, Finance Minister, Foreign Minister or a Sherpa of any G20 nation for a day! It’s one action-packed event full of debating, discussing, voting and consensus-building. You will be creating an action plan for real-world issues. What's more, your ideas will be shared with policymakers. Exciting right? Don't wait and click on the link below to register: " +
              shareableLink +
              ' All the best! P.S. Don’t forget to complete the short G20 Orientation Course. It’s critical for your participation and you will receive a certificate.'
            }
            quote={'Model g20 India'}
            className="mx-1">
            <WhatsappIcon size={42} round />
          </WhatsappShareButton>
          <TelegramShareButton
            url={
              'Dear Student! The much anticipated Yuvamanthan Model G20 Summit (YMG20) is finally happening in ' +
              institution_name +
              " . In this simulation of the actual G20 summit, you can participate as a Prime Minister, Finance Minister, Foreign Minister or a Sherpa of any G20 nation for a day! It’s one action-packed event full of debating, discussing, voting and consensus-building. You will be creating an action plan for real-world issues. What's more, your ideas will be shared with policymakers. Exciting right? Don't wait and click on the link below to register: " +
              shareableLink +
              ' All the best! P.S. Don’t forget to complete the short G20 Orientation Course. It’s critical for your participation and you will receive a certificate.'
            }
            quote={'Model g20 India'}
            className="m-1">
            <TelegramIcon size={42} round />
          </TelegramShareButton>
          <PinterestShareButton
            url={
              'Dear Student! The much anticipated Yuvamanthan Model G20 Summit (YMG20) is finally happening in ' +
              institution_name +
              " . In this simulation of the actual G20 summit, you can participate as a Prime Minister, Finance Minister, Foreign Minister or a Sherpa of any G20 nation for a day! It’s one action-packed event full of debating, discussing, voting and consensus-building. You will be creating an action plan for real-world issues. What's more, your ideas will be shared with policymakers. Exciting right? Don't wait and click on the link below to register: " +
              shareableLink +
              ' All the best! P.S. Don’t forget to complete the short G20 Orientation Course. It’s critical for your participation and you will receive a certificate.'
            }
            quote={'Model g20 India'}
            className="m-1">
            <PinterestIcon size={42} round />
          </PinterestShareButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePopup;
