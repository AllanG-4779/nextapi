import React from "react";

function Delete({ id }) {
  const del = async () => {
    const issue = await fetch(`/api/channel/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const result = await issue.json();
  };
  return <div></div>;
}

export default Delete;
