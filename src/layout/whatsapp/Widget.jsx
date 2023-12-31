import React, { useState } from 'react';
import './widget.component.css';
import { Button, IconButton } from '@mui/material';
import { Close, WhatsApp } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';
import profile from './profile.jpg';

const Widget = () => {
  const [show, setShow] = useState(false);
  const showToggler = () => {
    setShow(!show);
  };
  const { token } = useGlobalContext();
  return (
    <>
      {!token ? (
        <div className="whatsapp-widget">
          <div id="whatsapp-chat" className={!token && show ? 'show' : 'hide'}>
            <div className="header-chat">
              <div className="head-home d-flex">
                <div className="info-avatar">
                  <img src={profile} />
                </div>
                <p>
                  <span className="whatsapp-name text-white">Yuvamanthan</span> <br />
                  <small className="text-light lh-sm d-block">
                    Engaging the youth in a global dialogue on international diplomacy, leadership and collective duty
                  </small>
                </p>
              </div>
              <div className="get-new hide">
                <div id="get-label" />
                <div id="get-nama" />
              </div>
            </div>
            <div className="home-chat"></div>
            <div className="start-chat">
              <div
                pattern="https://elfsight.com/assets/chats/patterns/whatsapp.png"
                className="WhatsappChat__Component-sc-1wqac52-0 whatsapp-chat-body">
                <div className="WhatsappChat__MessageContainer-sc-1wqac52-1 dAbFpq">
                  <div style={{ opacity: 0 }} className="WhatsappDots__Component-pks5bf-0 eJJEeC">
                    <div className="WhatsappDots__ComponentInner-pks5bf-1 hFENyl">
                      <div className="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotOne-pks5bf-3 ixsrax" />
                      <div className="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotTwo-pks5bf-4 dRvxoz" />
                      <div className="WhatsappDots__Dot-pks5bf-2 WhatsappDots__DotThree-pks5bf-5 kXBtNt" />
                    </div>
                  </div>
                  <div style={{ opacity: 1 }} className="WhatsappChat__Message-sc-1wqac52-4 kAZgZq">
                    <div className="WhatsappChat__Author-sc-1wqac52-3 bMIBDo">Yuvamanthan</div>
                    <div className="WhatsappChat__Text-sc-1wqac52-2 iSpIQi">
                      Hi there 👋
                      <br />
                      How can I help you?
                    </div>
                    <div className="WhatsappChat__Time-sc-1wqac52-5 cqCDVm">now</div>
                  </div>
                </div>
              </div>
              <div className="blanter-msg p-2 bg-white">
                <Button
                  target="_blank"
                  href="https://wa.me/919560771911"
                  variant="contained"
                  style={{ backgroundColor: '#42cd66', color: 'white' }}
                  fullWidth
                  className="rounded-pill text-white p-3 text-capitalize">
                  <WhatsApp />
                  &nbsp;Click to Chat
                </Button>
              </div>
            </div>
            <div id="get-number" />
            <a className="close-chat" onClick={showToggler}>
              <Close />
            </a>
          </div>
          <a className="blantershow-chat" onClick={showToggler} title="Show Chat">
            <svg width={35} viewBox="0 0 24 24">
              <defs />
              <path fill="#eceff1" d="M20.5 3.4A12.1 12.1 0 0012 0 12 12 0 001.7 17.8L0 24l6.3-1.7c2.8 1.5 5 1.4 5.8 1.5a12 12 0 008.4-20.3z" />
              <path fill="#4caf50" d="M12 21.8c-3.1 0-5.2-1.6-5.4-1.6l-3.7 1 1-3.7-.3-.4A9.9 9.9 0 012.1 12a10 10 0 0117-7 9.9 9.9 0 01-7 16.9z" />
              <path
                fill="#fafafa"
                d="M17.5 14.3c-.3 0-1.8-.8-2-.9-.7-.2-.5 0-1.7 1.3-.1.2-.3.2-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.3-.6.4-.6 1-1.7l-.1-.5-1-2.2c-.2-.6-.4-.5-.6-.5-.6 0-1 0-1.4.3-1.6 1.8-1.2 3.6.2 5.6 2.7 3.5 4.2 4.2 6.8 5 .7.3 1.4.3 1.9.2.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"
              />
            </svg>
          </a>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Widget;
