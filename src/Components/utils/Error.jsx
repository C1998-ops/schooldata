import React from "react";

function Error({ errors, field }) {
  return (
    <div>
      {errors[field] && (
        <span className="block w-full text-red-500 text-sm p-2">
          {errors[field]}
        </span>
      )}
    </div>
  );
}

export default Error;
