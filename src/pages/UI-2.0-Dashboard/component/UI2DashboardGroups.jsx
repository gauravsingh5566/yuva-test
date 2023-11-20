import React from "react";
const groups = [
  {
    id: 1,
    name: "Mental Health and Well-being",
    staus: false,
  },
  {
    id: 2,
    name: "Artificial Intelligence and Robotics",
    staus: true,
  },
  {
    id: 3,
    name: "Digital Innovation and Technology Trends",
    staus: false,
  },
  {
    id: 4,
    name: "Health and Fitness",
    staus: false,
  },
  {
    id: 5,
    name: "Career Planning and Skill Development",
    staus: false,
  },
  {
    id: 6,
    name: "Nutrition and Healthy Eating",
    staus: false,
  },
  {
    id: 7,
    name: "Sports and Athletics",
    staus: true,
  },
  {
    id: 8,
    name: "Language Learning and Linguistics",
    staus: false,
  },
  {
    id: 9,
    name: "Conservation and Wildlife Preservation",
    staus: false,
  },
];

export const UI2DashboardGroups = () => {
  return (
    <>
      <div className="w-100 rounded-4 shadow ">
        <div className="row px-4">
          <div className="d-flex justify-content-between align-items-center">
              <h3 className="fs-3 fw-bold py-3">Groups</h3>
              <h3 className="fs-5 fw-bold cursor-pointer addBtn">Add Group</h3>

          </div>

          <div className="d-flex flex-wrap pb-4">
            {groups.map((group, index) => {
              return (
                <>
                  <span
                    className="p-2 mx-2 fs-6 my-2 my-lg-1 rounded-3"
                    style={{
                      color: "#7A0098",
                      background: group.staus === true ? "#F3D1FF" : "#FDF2FF",
                    }}
                  key={group.id}
                  >
                    {group?.name}
                  </span>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
