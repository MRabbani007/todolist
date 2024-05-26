import React, { useContext, useState } from "react";
import { IMAGES_Icons, listTemplates } from "../../data/templates";
import { BiX } from "react-icons/bi";
import { GlobalContext } from "../../context/GlobalState";

const ListIcon = ({ list }) => {
  const { handleUpdateList } = useContext(GlobalContext);

  const [editListIcon, setEditListIcon] = useState(false);

  // Handle update list icon
  const handleIcon = (icon) => {
    handleUpdateList(list?.id, "list_icon", icon);
    setEditListIcon(false);
  };

  const handleReset = () => {
    setEditListIcon(false);
  };

  return (
    <div className="flex flex-wrap items-center">
      {editListIcon ? (
        <form
          onReset={handleReset}
          className="flex flex-wrap items-center gap-3"
        >
          {listTemplates.map((item, index) => {
            return (
              <img
                key={index}
                alt=""
                src={IMAGES_Icons + item.icon}
                className="icon-lg cursor-pointer"
                onClick={() => handleIcon(item.icon)}
              />
            );
          })}
          <button type="reset">
            <BiX size={32} />
          </button>
        </form>
      ) : (
        <img
          src={IMAGES_Icons + list?.icon}
          alt=""
          className="icon mr-2 z-10"
          onClick={() => setEditListIcon(true)}
        />
      )}
    </div>
  );
};

export default ListIcon;
