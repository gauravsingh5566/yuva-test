import { CChart } from '@coreui/react-chartjs';
import React from 'react';

function VotePollChart(props) {
  const label = [];
  const values = [];
  var { votesCount, options } = props;
  if (votesCount.vote && options) {
    votesCount = Object.values(votesCount.vote);
    // options = Object.values(JSON.parse(options))
    votesCount.map((key) => {
      label.push(key['vote']);
      return key;
    });
    votesCount.map((key) => {
      values.push(key['vote_count']);
      return key;
    });
  }
  return (
    <div className="container w-lg-25">
      <CChart
        className="w-lg-50 w-xl-50"
        type="bar"
        data={{
          labels: label,
          datasets: [
            {
              label: 'Student VOtes',
              data: values,
              borderWidth: 1,
            },
          ],
        }}
        labels="months"
      />
    </div>
  );
}

export default VotePollChart;
