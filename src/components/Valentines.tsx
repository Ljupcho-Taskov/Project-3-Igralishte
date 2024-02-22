import React from "react";

const Valentines = () => {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-between"
      style={{
        height: "605px",
      }}
    >
      <div className="row">
        <div className="col">
          <div className="image-without-circle ml-auto">
            <img src="../images/coll 1.png" alt="" />
            <div className="circle left-7 pointer">
              <div className="circle-inner">
                <img
                  className="stars"
                  src="../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                  alt=""
                />
                <p>
                  Valentines gal <br /> Kолекција
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
      <div className="row mt-3">
        <div className="col">
          <p className="trendi">Trendy парчиња во моментов</p>
        </div>
      </div>
    </div>
  );
};

export default Valentines;
