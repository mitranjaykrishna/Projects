import React from "react";

function info(props)
{
    return <div className="bottom">
        <p className="info">{props.tel}</p>
        <p className="info">{props.email}</p>
      </div>
}

export default info;