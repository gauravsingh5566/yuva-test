import LoaderSplash from 'layout/LoaderSplash';
import YuvaLoader from 'pages/Forum/components/Loader/YuvaLoader';
import Swal from 'sweetalert2';

export const Popup = (attr, title, description, timer) => {
  switch (attr) {
    case 'loading':
      return <LoaderSplash />;
    case 'loading-yuva':
      return <YuvaLoader />;
    case 'success':
      Swal.fire({
        title: title ? title : 'success',
        html: description,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/7518/7518748.png',
        imageHeight: 100,
        timer: timer,
        timerProgressBar: true,
        width: 400,
      });
      break;
    case 'warning':
      Swal.fire({
        title: title ? title : 'Warning',
        html: description,
        timer: timer,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/8213/8213126.png',
        imageHeight: 100,
        timerProgressBar: true,
        width: 400,
      });
      break;
    case 'error':
      Swal.fire({
        width: 400,
        title: title ? title : 'Something Went Wrong Check your Network Connection',
        html: description,
        timer: timer,
        timerProgressBar: true,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2581/2581801.png',
        imageHeight: 100,
      });
      break;
    default:
      return <LoaderSplash show={false} />;
  }
};

export const pop2 = {
  loading: function () {
    return <LoaderSplash />;
  },
  loadingYuva: function () {
    return <YuvaLoader />;
  },
  success: function ({ title, description, timer }) {
    Swal.fire({
      title: title ? title : 'success',
      html: description,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/7518/7518748.png',
      imageHeight: 100,
      timer: timer,
      timerProgressBar: true,
      width: 400,
    });
  },
  warning: function ({ title, description, timer }) {
    Swal.fire({
      title: title ? title : 'Warning',
      html: description,
      timer: timer,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/8213/8213126.png',
      imageHeight: 100,
      timerProgressBar: true,
      width: 400,
    });
  },
  error: function ({ title, description, timer }) {
    Swal.fire({
      width: 400,
      title: title ? title : 'Something Went Wrong Check your Network Connection',
      html: description,
      timer: timer,
      timerProgressBar: true,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2581/2581801.png',
      imageHeight: 100,
    });
  },
  timedout: function ({ title, description, timer }) {
    Swal.fire({
      width: 400,
      title: title ? title : 'Session Timed Out',
      html: description,
      timer: timer,
      timerProgressBar: true,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/771/771495.png',
      imageHeight: 100,
    });
  },
  clear: function ({ title, description, timer }) {
    Swal.close();
  },
  confirm: function () {
    return <LoaderSplash show={false} />;
  },
};
