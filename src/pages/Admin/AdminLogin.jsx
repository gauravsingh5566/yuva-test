import { api, apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../layout/BreadCrumb';
import bgImg from '../Auth/flag-bg.jpg';

const styles = {
  title: {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
};
const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiJson.post(`auth/login?type=2`, {
        identifier: email,
        password,
      });
      if (res.status == 200) {
        setUser(res.data.user);
        setToken(res.data.jwt);
        toast.dismiss();
        toast.success(res.data.message);
        navigate('/dashboard');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error) {
        toast.dismiss();
        toast.error(error.response?.data.message ? error.response?.data.message : 'Something Went Wrong check your internet Connection');
      }
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <div className="container py-5 mt-lg-5 h-100">
        {/* <!-- ========== Start Login ========== --> */}
        <div className="row row-cols-1 row-cols-lg-2 align-items-center">
          <div className="col" style={styles.title}>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </div>
          <div className="col">
            <div>
              <h4 className="text-center text-black">Welcome to</h4>
              <h3 className="text-center text-primary"> Yuvamanthan</h3>
              <form onSubmit={handlesubmit} className="login-card container py-5" style={{ maxWidth: '450px' }}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control p-4"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email ID"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control p-4"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div className="mt-3 text-center">
                  <button type="submit" name="login-btn" id="login-btn" className="btn btn-primary px-5 btn-primary-outline">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* s s */}
        {/* <!-- ========== End Login ========== --> */}
      </div>
    </>
  );
};

export default AdminLogin;
