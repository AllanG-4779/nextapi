import React, { useState } from "react";
import style from "../styles/Edit.module.css";
function Edit({ valueEdit, type, active, id, changeStat }) {
  const [edit, setEdit] = useState(valueEdit);
  const [current, setCurrent] = useState(active);

  const update = async () => {
    const data = {};
    if (type == "number") {
      data = { subcribers: edit };
    } else if (type === "text") {
      data = { name: edit };
    }
    try {
      const req = await fetch(`/api/channel/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!req.ok) {
        throw new Error(req.statusText);
      }
      const result = await req.json();
      alert(result.message);
      setEdit("");
      changeStat(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className={`${style.edit} ${!active ? style.visible : ""}`}>
      <input
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        type={type}
      />
      <button onClick={update}>Push</button>
    </div>
  );
}

export default Edit;
