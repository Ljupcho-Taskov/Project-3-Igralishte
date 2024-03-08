import React from "react";
import { useRouter } from "next/router";

const Accessories = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/product",
          query: "accessories=Обетки&accessories=Ташни",
        });
      }}
      className="container-fluid d-flex flex-column justify-content-between mb-5"
      style={{
        height: "605px",
      }}
    >
      <div className="row">
        <div className="col">
          <div className="image-without-circle mr-auto ">
            <img
              src="../images/red-bags/0_acd997b5-2773-4fda-8edb-d314984f8348.jpg"
              alt=""
            />
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
