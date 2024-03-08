// SaveInfoModal.tsx
import React from "react";

interface SaveInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (event: any) => void;
}

const SaveInfoModal: React.FC<SaveInfoModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
}) => {
  return (
    <>
      {isOpen && (
        <div className="order-modal">
          <div className="order-modal-content">
            <div className="sparksForm"></div>
            <p className="order-modal-p">
              Дали сте сигурни дека сакате да ги промените податоците?
            </p>
            <div className="row mt-3 d-flex justify-content-around">
              <button
                onClick={() => {
                  handleSubmit(event);
                  onClose();
                }}
                className="text-center col-5 pointer"
              >
                Да
              </button>
              <button onClick={onClose} className="text-center col-5 pointer">
                Не
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveInfoModal;
