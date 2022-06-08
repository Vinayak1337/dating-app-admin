import React from "react";
import "./NotFound.css";

const PageNotFound = () => {
  return (
    <div className="main-content">
      <div
        className="page-content"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className="error-body">
          <div className="error-text">
            <p>
              404 <span /> Page Not Found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
