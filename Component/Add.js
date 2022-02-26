import { useRouter } from "next/router";
import React, { useState } from "react";
import add from "../styles/add.module.css";
function Add() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subs, setSub] = useState(0);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const getData = async () => {
    const data = { name: name, subcribers: subs };
    console.log(data);
    try {
      const issue = await fetch("/api/channel/post", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!issue.ok) {
        throw new Error(issue.statusText);
      }
      const result = await issue.json();
      setSuccess(result.message);
      router.reload();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Add new Subscriber</h1>
      <div
        className={`${success ? add.success : error ? add.error : add.hide} ${
          success || error ? add.alert : ""
        }`}
      >
        <p>{error ? error : success ? success : ""}</p>
        <p
          onClick={() => {
            setSuccess(undefined);
            setError(undefined);
            setName("");
            setSub(0);
          }}
          style={{ fontWeight: "bold", cursor: "pointer" }}
        >
          X
        </p>
      </div>
      <div className={add.control}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={add.control}>
        <label>Subs</label>
        <input
          type="number"
          name="name"
          value={subs}
          onChange={(e) => setSub(e.target.value)}
        />
      </div>
      <div className={add.control}>
        <button onClick={getData}>Add the sub</button>
      </div>
    </div>
  );
}

export default Add;
