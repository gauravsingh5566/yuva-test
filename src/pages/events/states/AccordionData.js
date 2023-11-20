import React from 'react';
function AccordionData({ schedule }) {
  return (
    <div className="table-responsive">
      <table className="table table-borderless" style={{ minWidth: '900px' }}>
        <thead className="thead">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Agency</th>
            <th scope="col">Meeting</th>
            <th scope="col">Dates</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {schedule.map((date, key) => {
            {
              /* console.log(date); */
            }
            return (
              <>
                <tr>
                  <th scope="row">{date.id}</th>
                  <td>{date.agency}</td>
                  <td>{date.meeting}</td>
                  <td>{date.dates}</td>
                  <td>{date.city}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AccordionData;
