import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeclarationItem from './ChatRoom/DeclarationItem';
import LeaderboradItem from './ChatRoom/LeaderboradItem';
import useChat from '../useChat';

const DeclarationPoints = ({ reloader }) => {
  // Function to Fetch Messages
  const { ErrorResponder } = useError();
  const { token, userData } = useGlobalContext();
  const params = useParams();
  const { reload, vote } = useChat(params?.meetingid);
  const [DeclarationPointsData, setDeclarationPointsData] = useState([]);
  const fetchLeaderBoard = async () => {
    if (params?.meetingid) {
      try {
        const response = await apiJsonAuth.post(
          `/discussion/declaration/leaderboard`,
          {
            roomId: params?.meetingid,
            institutueId: userData?.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // console.log("LEADERBOARD===>", response);
        if (response.status === 200) {
          setDeclarationPointsData(response?.data?.result);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  React.useEffect(() => {
    fetchLeaderBoard();
  }, [params?.meetingid, reloader, reload, vote]);
  return (
    <div>
      <h3 className="fs-3 text-center py-4">
        Declaration points <span className="text-primary">Top 30</span>{' '}
      </h3>
      <ol className="messages-list p-0">
        {DeclarationPointsData?.map((point, i) => (
          <DeclarationItem key={i} fetchLeaderBoard={fetchLeaderBoard} const={userData} message={point} i={i} />
        ))}
      </ol>
    </div>
  );
};

export default DeclarationPoints;
