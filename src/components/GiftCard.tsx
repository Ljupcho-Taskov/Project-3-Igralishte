import React from "react";

const GiftCard = () => {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-between"
      style={{
        height: "605px",
      }}
    >
      <div className="row">
        <div className="col">
          <div className="gift-card">
            <div className="gift-card-img">
              <img
                src="../images/d1f18373243eb7e02edb02e636da3eb2.jpg"
                alt=""
              />
            </div>
            <div className="star">
              <img
                src="../logo/emojione-monotone_eight-pointed-star.png"
                alt=""
              />
            </div>
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
