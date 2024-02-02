import Link from "next/link";
import React from "react";

const GiftCard = () => {
  return (
    <div
      className="container-fluid d-flex flex-column"
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
            <Link href="/giftCard">
              <div className="circle pointer">
                <div className="circle-inner">
                  <img
                    className="stars"
                    src="../logo/sparks-elements-and-symbols-isolated-on-white-background-free-vector 2.png"
                    alt=""
                  />
                  <p>GIFT CARDS</p>
                  <small>
                    Избери уникатен подарок за твоите најблиски со нашиот избор
                    на ultra fancy картички за подарок.
                  </small>
                  <div className="arrow">
                    <img src="../logo/Group 36.png" alt="" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
