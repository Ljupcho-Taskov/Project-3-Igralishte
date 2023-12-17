import Link from "next/link";
import React from "react";

const OrderSuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="order-modal">
    <div className="order-modal-content">
      <div className="sparksForm"></div>
      <p className="order-modal-p">Вашата нарачка е успешна!</p>
      <p className="order-modal-small">
        Очекувајте потврда за вашата нарачка на вашата емаил адреса. Keep on
        shining *
      </p>
      <button className="continue-button" type="submit">
        Продолжи
      </button>
      <Link href="/">
        <button onClick={onClose} className="cancel-order-button">
          Кон почетна
        </button>
      </Link>
    </div>
  </div>
);

export default OrderSuccessModal;
