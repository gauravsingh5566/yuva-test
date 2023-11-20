import { Backdrop, Button } from '@mui/material';
import logo from './loader.svg';
import './YuvaLoader.css';
import { Cancel } from '@mui/icons-material';

function YuvaLoader({ show, setShow, color }) {
  return (
    <Backdrop className="vh-100" sx={{ color: 'yellow', zIndex: 3000 }} open={show ? show : true}>
      {setShow && (
        <Button
          onClick={() => setShow(false)}
          className="text-white bg-light bg-opacity-25 p-absolute"
          style={{ position: 'absolute', top: 20, right: 20 }}>
          <Cancel /> Close
        </Button>
      )}
      <div className="d-flex align-items-center h-100">
        <div style={{ position: 'relative' }}>
          <div className="yloader">
            <img src={logo} className="yloader-logo" alt="logo" />
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

export default YuvaLoader;
