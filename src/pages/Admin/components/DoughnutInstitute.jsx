import { CChart } from '@coreui/react-chartjs';
import React from 'react';

function DoughnutInstitute({ Student, allStudents, StudentName, allStudentsName }) {
  return (
    <div className="border shadow-sm rounded p-2 p-lg-3 h-100 ">
      <div className="row g-1">
        <div className="col-7">
          <CChart
            type={"doughnut"}
            className="text-bolder h-100 w-100"
            data={{
              labels: [allStudentsName, StudentName],
              datasets: [
                {
                  backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                  data: [allStudents, Student],
                  weight: 100,
                },
              ],
              hoverOffset: 2,
            }}
          />
        </div>
        <div className="col-5">
          <div>
            <div>
              <h4 className="m-0">{allStudentsName}</h4>
            </div>
            <div>
              <h1 className="fw-bold">{allStudents ? allStudents : "0"}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoughnutInstitute;
