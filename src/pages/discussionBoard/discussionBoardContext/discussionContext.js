import { apiJson } from "api";
import { useGlobalContext } from "global/context";
import { createContext, useContext, useEffect, useState } from "react";

const Discussioncontext = createContext();

const DiscussionProvider = ({ children }) => {
  const { userData } = useGlobalContext()
  const [getDiscByInstituteId, setDiscByInstituteId] = useState([])
  const [isLoading,setLoading] = useState(false)
  
  let role = userData?.role
  let instituteId = '';

  if (role === 'institute') {
    instituteId = userData.id;
  } else {
    instituteId = userData.instituteId;
  }
  // ========== Get All discussion List by Institute Id api call ============

  const AllDiscussionList = async () => {
    try {
      setLoading(true)
      const discussionList = await apiJson.get(`/api/v2/discussion_board/discussion-list/${instituteId}`);
      if (discussionList) {
        setDiscByInstituteId(discussionList?.data?.allDiscussion)
      }
     setLoading(false)
    } catch (error) {
      console.log(error, "Discussion List by  Id");
      setLoading(false)
    }
  }
  useEffect(() => {
    AllDiscussionList();
  }, [])

  const contextValue = {
    getDiscByInstituteId, setDiscByInstituteId,isLoading,setLoading
  };
  return (
    <Discussioncontext.Provider value={contextValue}>
      {children}
    </Discussioncontext.Provider>
  );
};

// custom hooks
const useDiscussionContext = () => {
  return useContext(Discussioncontext);
};

export { DiscussionProvider, Discussioncontext, useDiscussionContext };
