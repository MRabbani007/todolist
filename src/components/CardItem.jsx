import React, { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { FaBars, FaCirclePlus, FaPlus, FaTag } from "react-icons/fa6";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

import IMG_Delete from "../assets/trash.png";
import IMG_Edit from "../assets/edit.png";
import IMG_Cancel from "../assets/cancel.png";
import IMG_Save from "../assets/save.png";
import IMG_Done from "../assets/done.png";

const CardItem = ({
  task,
  index,
  handleDeleteTask,
  handleUpdateTask,
  listID,
  dragItemStart,
  dragItemEnter,
  dragItemEnd,
}) => {
  // View/hide edit title
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(task.value);
  // Expand/Collapse item block
  const [expand, setExpand] = useState(false);

  const [dueDate, setDueDate] = useState("2024-01-01");

  const [addDetail, setAddDetail] = useState(false);
  const [detailInput, setDetailInput] = useState(task.detail || "");

  const [addTag, setAddTag] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleDueDate = (value) => {
    handleUpdateTask(task.id, "due_date", value);
  };

  const handleDetail = () => {
    handleUpdateTask(task.id, "detail", detailInput);
  };

  const handlePriority = (value) => {
    handleUpdateTask(task.id, "priority", value);
  };

  const handleTag = () => {
    handleUpdateTask(task.id, "add_tag", tagInput);
  };

  useEffect(() => {
    setDueDate(task.dueDate);
  }, [task]);

  return (
    <li key={task.id}>
      <div
        className="flex flex-col justify-between bg-slate-200 w-full my-3 p-2 font-normal shadow-sm hover:shadow-slate-950 shadow-slate-400 duration-300"
        // implement draggable
        draggable="true"
        onDragStart={(e) => {
          dragItemStart(e, listID, index);
        }}
        onDragEnter={(e) => dragItemEnter(e, listID, index)}
        onDragEnd={dragItemEnd}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) =>
              handleUpdateTask(task.id, "task_complete", e.target.checked)
            }
            className="mr-3"
          />
          {edit ? (
            <div className="flex w-full items-center justify-between">
              <input
                type="text"
                className="w-[70%] text-slate-950 font-normal"
                value={editInput}
                onChange={(e) => {
                  setEditInput(e.target.value);
                }}
              />
              <span className="flex items-center">
                <img
                  src={IMG_Save}
                  alt=""
                  className="icon"
                  onClick={() => {
                    handleUpdateTask(task.id, "task_title", editInput);
                    setEdit(!edit);
                  }}
                />
                <img
                  src={IMG_Cancel}
                  alt=""
                  className="icon"
                  onClick={() => setEdit(!edit)}
                />
              </span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <p
                  onClick={() => setExpand(!expand)}
                  className="cursor-pointer"
                >
                  {task.title}
                </p>
                {task.dueDate === "" ? null : (
                  <p className="font-light p-0 my-[-5px]">
                    Due: {task.dueDate}
                  </p>
                )}
              </div>
              <img
                src={IMG_Edit}
                alt=""
                className="icon"
                onClick={() => setEdit(!edit)}
              />
            </div>
          )}
          <img
            src={IMG_Delete}
            alt=""
            onClick={() => handleDeleteTask(task.id)}
            className="icon"
          />
        </div>
        <div className={expand ? "border-[1px] border-dashed p-2" : "hidden"}>
          <div className="py-3">
            <h3 className="font-semibold mb-2">Details:</h3>
            {task.details === "" ? (
              <FaCirclePlus
                className="icon-lg text-yellow-400"
                onClick={() => setAddDetail(true)}
              />
            ) : null}
            {addDetail ? (
              <>
                <input
                  type="text"
                  value={detailInput}
                  onChange={(e) => {
                    setDetailInput(e.target.value);
                  }}
                />
                <img
                  src={IMG_Cancel}
                  alt=""
                  className="icon-lg"
                  onClick={() => {
                    setAddDetail(false);
                  }}
                />
                <img
                  src={IMG_Done}
                  alt=""
                  className="icon-lg"
                  onClick={() => {
                    handleDetail();
                    setAddDetail(false);
                  }}
                />
              </>
            ) : (
              <p onClick={() => setAddDetail(true)}>{task.details}</p>
            )}
          </div>
          <div className="py-3">
            <h3 className="font-semibold mb-2">Due Date:</h3>
            {/* date input in format yyyy-mm-dd */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => handleDueDate(e.target.value)}
              className="mr-3 px-3 py-1 outline-none border-[1px] text-slate-950"
            />
            <input
              type="time"
              className="mr-3 px-3 py-1 outline-none border-[1px] text-slate-950"
            />
          </div>
          <div className="py-3">
            <h3 className="font-semibold mb-2">Priority:</h3>
            <span
              className={
                (task.priority === "high" ? "bg-red-400" : "bg-slate-200") +
                " py-1 px-5 m-1 inline-block rounded-full"
              }
              onClick={() => handlePriority("high")}
            >
              {/* <input type="radio" name={task.id} className="mr-2" /> */}
              <FcHighPriority className="icon mr-1" />
              High
            </span>
            <span
              className={
                (task.priority === "normal"
                  ? "bg-yellow-200"
                  : "bg-slate-200") + " py-1 px-5 m-1 inline-block rounded-full"
              }
              onClick={() => handlePriority("normal")}
            >
              {/* <input type="radio" name={task.id} className="mr-2" /> */}
              <FcMediumPriority className="icon mr-1" />
              Normal
            </span>
            <span
              className={
                (task.priority === "low" ? "bg-green-400" : "bg-slate-200") +
                " py-1 px-5 m-1 inline-block rounded-full"
              }
              onClick={() => handlePriority("low")}
            >
              {/* <input type="radio" name={task.id} className="mr-2" /> */}
              <FcLowPriority className="icon mr-1" />
              Low
            </span>
          </div>
          <div className="py-3">
            <h3 className="font-semibold mb-2">
              <FaTag className="icon" /> Tags:
            </h3>
            {task.tags.length === 0
              ? null
              : task.tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="mx-2 bg-slate-400 rounded-full px-3 py-1"
                    >
                      <FaTag className="icon" />
                      {tag}
                    </span>
                  );
                })}
            <span className="">
              <FaPlusCircle
                className="icon-lg"
                onClick={() => {
                  setAddTag(true);
                }}
              />
            </span>
            {addTag ? (
              <>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                  }}
                />
                <img
                  src={IMG_Done}
                  alt=""
                  onClick={() => {
                    handleTag();
                    setAddTag(false);
                  }}
                  className="icon"
                />
                <img
                  src={IMG_Cancel}
                  alt=""
                  onClick={() => {
                    setAddTag(false);
                  }}
                  className="icon"
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardItem;