import { apiAuth } from 'api';
import { useGlobalContext } from 'global/context';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Enroll = ({ id }) => {
  const { userData } = useGlobalContext();
  const { token } = useGlobalContext();
  const navigate = useNavigate();
  const proceedEnroll = async () => {
    let formdata = {
      courseId: id,
      studentId: userData.id,
    };
    if (token) {
      try {
        const res = await apiAuth.post(`/course/enroll`, formdata, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status == 200) {
          toast.dismiss();
          toast.success(`Enrolled Successfully`);
          navigate(`/dashboard/courseview/${formdata.courseId}`);
        }
      } catch (error) {
        if (error) {
          toast.dismiss();
          if (error.response.status === 409) {
            toast(error.response.data.message ? error.response.data.message : 'Something went wrong check your network connection', {
              icon: '😃',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
            navigate(`/dashboard/courseview/${formdata.courseId}`, {
              state: {
                tabId: 'enrolled',
              },
            });
          } else if (error.response.status !== 409) {
            toast.error(error.response.data.message ? error.response.data.message : 'Something went wrong check your network connection');
          }
        }
      }
    }
  };
  const enrollHandler = () => {
    proceedEnroll();
  };

  return (
    <div class="modal fade" id="courseEnroll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title  fs-5" id="exampleModalLabel">
              Confirm Box
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body ">
            <h4 className="text-initial">Do you confirm you want to enroll</h4>
            <div className="row row-cols-2 g-1 mt-4 justify-content-center">
              <div className="col">
                <button type="button" className="btn btn-outline-danger w-100 rounded-3" data-bs-dismiss="modal">
                  Discard
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary hover-ripple w-100 rounded-3" onClick={enrollHandler} data-bs-dismiss="modal">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
