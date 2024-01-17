import React from "react";

const GiftCard = () => {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-between"
      style={{ height: "605px" }}
    >
      <div className="row">
        <div className="col">
          <div className="gift-card">
            <div className="gift-card-img"></div>
            <div className="star"></div>
            <div className="circle">
              <div className="circle-inner">
                <div className="stars"></div>
                <p>GIFT CARDS</p>
                <small>
                  Избери уникатен подарок за твоите најблиски со нашиот избор на
                  ultra fancy картички за подарок.
                </small>
                <div className="arrow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
