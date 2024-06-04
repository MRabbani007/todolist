import { DatePicker, Radio, Select, Space } from "antd";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

export default function CardFilterList() {
  const { listNames } = useContext(GlobalContext);
  const lists = listNames.map((item) => {
    return { label: item.title, value: item.id, desc: item.title };
  });
  const options = lists; //[{ label: "All", value: "all", desc: "All Lists" }, ...lists];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <h3>In List</h3>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>All</Radio>
        <Radio value={2}>Selected</Radio>
      </Radio.Group>
      <Select
        mode="multiple"
        style={{
          width: "100%",
          minWidth: "200px",
        }}
        placeholder="select lists"
        defaultValue={[]}
        onChange={handleChange}
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc}
          </Space>
        )}
      />
    </div>
  );
}