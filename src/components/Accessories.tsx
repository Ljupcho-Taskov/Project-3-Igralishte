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
            <div className="circle right-7">
              <div className="circle-inner">
                <div className="stars"></div>
                <p>
                  Козметика & <br /> аксесоари
                </p>
                <small>Погледни ги свежите љубовни парчиња</small>
                <div className="arrow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="trendi">Trendy парчиња во моментов</p>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
