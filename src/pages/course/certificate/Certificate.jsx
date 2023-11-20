import { apiAuth, apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AccessDenied from 'components/Fallback/AccessDenied';
import { Card, CardContent, CardHeader, Divider, IconButton, Skeleton } from '@mui/material';
import { ArrowOutwardTwoTone, MoreVertTwoTone } from '@mui/icons-material';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';

const CertficateComponent = ({ cert }) => {
  const [isMouse, setIsMouse] = useState(false);
  return (
    <div
      id="certificate"
      onMouseEnter={() => setIsMouse(true)}
      onMouseLeave={() => setIsMouse(false)}
      className="certificate-card certficate-container rounded-3 border-0 shadow p-relative"
      style={{ overflow: 'hidden' }}>
      <img src={cert.img} alt="safeinschool certification rounded-3" className="w-100" />
      <div className={`link-container`}>
        <Link className={`link text-center fade ${isMouse ? 'show' : ''}`} to={`/dashboard/certificate/${cert.courseId}`}>
          <ArrowOutwardTwoTone />
          <br />
          View
        </Link>
      </div>
    </div>
  );
};
const AdditionalCertficateComponent = ({ cert }) => {
  return (
    <div className="border">
      <div id="certificate" className="certficate-container">
        <img src={cert?.img} alt="" className="w-100" />
      </div>
      <div className="p-3">
        <Link to={cert?.img}>Download</Link>
      </div>
    </div>
  );
};
const LoadingSkelton = () => {
  return (
    <>
      <Card sx={{ maxWidth: 385, m: 2 }}>
        {<Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />}
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
          title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
      </Card>
    </>
  );
};

const Certificate = () => {
  const [loading, setLoading] = useState(true);
  const [certificates, setcertificates] = useState([]);
  const [AdditionalCertificates, setAddinalCertificates] = useState([]);
  const { userData, token } = useGlobalContext();
  const getCertificatesByuserId = async () => {
    if (token) {
      if (userData.id) {
        try {
          const res = await apiAuth.get(`/course/allcertificates?studentId=${userData.id}`, {
            headers: {
              Authorization: token,
            },
          });
          if (res?.status === 200) {
            setcertificates(res?.data?.result);
            setLoading(false);
          }
        } catch (err) {
          toast.dismiss();
          setLoading(false);
          toast.error(err?.response?.data?.message ? err?.response?.data?.message : 'Something Went wrong check your internet connection');
        }
      }
    }
  };
  function fetchAddinalCertificate() {
    apiJsonAuth
      .get('/course/ekal_certificate?studentId=' + userData?.id)
      .then((res) => {
        // console.log(res.data?.certificates);
        setAddinalCertificates(res.data?.certificates);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    if (token) {
      fetchAddinalCertificate();
      getCertificatesByuserId();
    }
  }, [token]);
  return (
    <>
      <SimpleBreadCrumb page={'Certificates'} />
      <div className="container">
        {certificates.length ? (
          <div className="py-3">
            {loading ? (
              <LoadingSkelton />
            ) : certificates.length === 0 ? (
              ''
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-2 row-cols-lg-3">
                {certificates?.map((data, i) => {
                  return (
                    <div className="col" key={i}>
                      <CertficateComponent cert={data} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          ''
        )}
        {AdditionalCertificates?.length ? (
          <div className="py-4">
            <Divider>
              {' '}
              <h4 className="mx-1"> Additional Certificates </h4>
            </Divider>
            {loading ? (
              <LoadingSkelton />
            ) : AdditionalCertificates?.length === 0 ? (
              ''
            ) : (
              <div className="row row-cols-1 g-2 row-cols-md-2 row-cols-lg-3">
                {AdditionalCertificates?.map((data, i) => {
                  return (
                    <div className="col" key={i}>
                      <AdditionalCertficateComponent cert={data} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          ''
        )}
        {loading ? <LoadingSkelton /> : ''}
        {!AdditionalCertificates.length && !certificates.length ? (
          <AccessDenied img={'https://glcloud.in/images/static/graphics/certificatefallback.webp'} message={'No Certificate Found'} />
        ) : (
          ''
        )}
      </div>
    </>
  );
};
export default Certificate;
