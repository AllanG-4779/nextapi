import React from "react";

function View({ user }) {
  return (
    <div>
      {user ? (
        <div>
          {" "}
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.subcribers}</p>
        </div>
      ) : (
        "Nothing to show"
      )}
    </div>
  );
}

export default View;
