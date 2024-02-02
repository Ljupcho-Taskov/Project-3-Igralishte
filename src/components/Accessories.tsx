import React from "react";

const Accessories = () => {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-between"
      style={{
        height: "605px",
      }}
    >
      <div className="row">
        <div className="col">
          <div className="image-without-circle mr-auto ">
            <img src="../images/IMG_6142 1.png" alt="" />
            <div className="circle right-7 pointer">
              <div className="circle-inner">
                <img
                  className="stars"
                  src="../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                  alt=""
                />
                <p>
                  Козметика & <br /> аксесоари
                </p>
                <small>Погледни ги свежите љубовни парчиња</small>
                <div className="arrow">
                  <img src="../logo/Group 36.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
