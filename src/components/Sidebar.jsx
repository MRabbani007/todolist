import React, { useState } from "react";
// Imported Components
import ListNames from "../components/ListNames";
// Imported Media
import Today from "../assets/today.png";
import Week from "../assets/week.png";
import Important from "../assets/important.png";
import IMG_List from "../assets/list.png";
import IMG_Trash from "../assets/trash-2.png";
import { FaCircle, FaCirclePlus } from "react-icons/fa6";

const Sidebar = ({
  todayTasks,
  userLists,
  handleOpen,
  handleLists,
  toggleCreateList,
}) => {
  const [viewUserLists, setViewUserLists] = useState(true);
  const [viewToday, setViewToday] = useState(true);
  const toggleUserLists = () => {
    setViewUserLists(!viewUserLists);
  };
  return (
    <>
      {/* Sidebar */}
      <div className="w-[300px] min-h-screen bg-slate-200 border-[1px] text-slate-950 p-2">
        <div
          className="flex flex-col items-center my-2 text-yellow-600 font-semibold cursor-pointer"
          onClick={() => setViewToday(!viewToday)}
        >
          <img src={Today} alt="" className="icon-lg mr-2" />
          <p>Today</p>
        </div>
        {/* Today Tasks */}
        <div className={viewToday ? "flex flex-col" : "hidden"}>
          {Array.isArray(todayTasks)
            ? todayTasks.map((task, index) => {
                let color = "";
                if (task.priority === "high") {
                  color = "text-red-400";
                } else if (task.priority === "normal") {
                  color = "text-yellow-200";
                } else if (task.priority === "low") {
                  color = "text-green-200";
                }
                return (
                  <p
                    key={index}
                    className="border-[1px] p-1 my-1 flex items-center hover:bg-slate-300 duration-300 cursor-pointer shadow-sm shadow-slate-500"
                    onClick={() => handleOpen(task.listID)}
                  >
                    <FaCircle className={color + " icon mr-2"} />
                    {task.title}
                  </p>
                );
              })
            : null}
        </div>
        <div className="flex flex-col items-center my-2 text-blue-700 font-semibold cursor-pointer">
          {/* <BsCalendar4Week className="icon mx-2 " /> */}
          <img src={Week} alt="" className="icon-lg mr-2" />
          Upcoming
        </div>
        <div className="flex items-center my-2 text-red-700 font-semibold cursor-pointer">
          {/* <FaRegStar className="icon mx-2 " /> */}
          <img src={Important} alt="" className="icon-lg mr-2" />
          Important
        </div>
        <div
          onClick={() => toggleUserLists()}
          className="flex items-center my-2 pb-1 font-semibold cursor-pointer"
        >
          {/* <IoListOutline className="icon mx-2" /> */}
          <img src={IMG_List} alt="" className="icon mr-2" />
          Lists
        </div>
        {viewUserLists ? (
          <>
            {/* Display Todo Lists */}
            <ListNames
              userLists={userLists}
              handleLists={handleLists}
              handleOpen={handleOpen}
              // dragStart={dragStart}
              // dragEnter={dragEnter}
              // dragEnd={dragEnd}
            />
            <div
              className="flex items-center my-2"
              onClick={() => toggleCreateList()}
            >
              <FaCirclePlus className="icon-lg mx-2 text-yellow-500" />
            </div>
          </>
        ) : null}
        <div className="flex items-center my-2 text-gray-700 font-semibold cursor-pointer">
          {/* <BsCalendar4Week className="icon mx-2 " /> */}
          <img src={IMG_Trash} alt="" className="icon-lg mr-2" />
          Move to Trash
        </div>
      </div>
    </>
  );
};

export default Sidebar;
