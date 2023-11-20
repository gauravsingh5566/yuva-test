import { apiAuth } from 'api';
import { useGlobalContext } from 'global/context';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StudentCoordinatorCard from './components/StudentCoordinatorCard';
import NotFoundGif from 'layout/NotFoundGif';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SimpleBreadCrumb from 'layout/SimpleBreadCrumb';

function EventWinners() {
  const { token } = useGlobalContext();
  const [winnersId, setWinnersId] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const { students } = useOutletContext();
  async function fetchWinners() {
    try {
      const res = await apiAuth.get('/institute/event-winners');
      setWinnersId(res.data?.result);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchWinners();
  }, [token]);

  useEffect(() => {
    if (winnersId && students) {
      let IdList = winnersId.map((i) => i.studentId);
      let winners = students.filter((std) => {
        if (IdList.includes(std.id)) return true;
      });
      setWinnersList(winners);
    }
  }, [winnersId]);

  function handelDeleteWinner(id) {
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You want to remove student',
      icon: 'warning',
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        apiAuth
          .delete('/institute/event-winners?id=' + id)
          .then((res) => {
            if (res.status === 200) {
              toast.success('Student Removed!');
              fetchWinners();
            } else {
              toast.warning('Something went Worng!');
            }
          })
          .catch((err) => {
            toast.warning('Something went Worng!');
          });
      }
    });
  }
  return (
    <div>
      <SimpleBreadCrumb page={'Event Winners'} />
      {winnersList.length ? (
        <div className="container">
          <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
            {winnersList.map((winner, i) => {
              return (
                <StudentCoordinatorCard
                  key={i}
                  student={winner}
                  removeFromCoordeinator={handelDeleteWinner}
                  position={winnersId.filter((list) => list.studentId === winner.id)[0]}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <NotFoundGif text={'No Student Added Yet!'} />
      )}
    </div>
  );
}
export default EventWinners;
