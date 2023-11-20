import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import WelcomeForum from './WelcomeForum';
import { ModalOverflow } from '@mui/joy';

export default function WelcomePopup({ layout, setLayout, canClose }) {
  return (
    <React.Fragment>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalOverflow>
          <ModalDialog aria-labelledby="layout-modal-title" aria-describedby="layout-modal-description" layout={layout} style={{ width: '70%' }}>
            {canClose ? <ModalClose /> : null}
            {/* 
                        <Typography id="layout-modal-title" component="h2">
                            Welcome Message
                        </Typography> */}
            <WelcomeForum />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
