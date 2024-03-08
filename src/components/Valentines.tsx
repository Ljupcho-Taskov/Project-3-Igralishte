import React from "react";
import { useRouter } from "next/router";

const Valentines = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/product",
        });
      }}
      className="container-fluid d-flex flex-column justify-content-between pb-5"
      style={{
        height: "605px",
      }}
    >
      <div className="row">
        <div className="col-12">
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
    </div>
  );
};

export default Valentines;
