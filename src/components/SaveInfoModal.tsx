// import React from "react";

// interface SaveInfoModalProps {
//   isSaveInfoModalOpen: boolean;
//   onClose: () => void;
//   handleSubmit: (event: any) => void;
// }

// const SaveInfoModal: React.FC<SaveInfoModalProps> = ({
//   isSaveInfoModalOpen,
//   onClose,
//   handleSubmit,
// }) => {
//   return (
//     <>
//       {isSaveInfoModalOpen && (
//         <div className="order-modal">
//           <div className="order-modal-content">
//             <div className="sparksForm"></div>
//             <p className="order-modal-p">
//               Дали сте сигурни дека сакате да ги промените податоците?
//             </p>
//             <div className="row mt-3 d-flex justify-content-around">
//               <form onSubmit={handleSubmit}>
//                 <button
//                   type="submit"
//                   onClick={() => {
//                     onClose();
//                   }}
//                   className="text-center col-5 pointer"
//                 >
//                   Да
//                 </button>
//               </form>
//               <button onClick={onClose} className="text-center col-5 pointer">
//                 Не
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SaveInfoModal;

// SaveInfoModal.tsx
import React from "react";

interface SaveInfoModalProps {
  isSaveInfoModalOpen: boolean;
  onClose: () => void;
  handleSaveChanges: () => void;
}

const SaveInfoModal: React.FC<SaveInfoModalProps> = ({
  isSaveInfoModalOpen,
  onClose,
  handleSaveChanges,
}) => {
  return (
    <>
      {isSaveInfoModalOpen && (
        <div className="order-modal">
          <div className="order-modal-content">
            <div className="sparksForm"></div>
            <p className="order-modal-p">
              Дали сте сигурни дека сакате да ги промените податоците?
            </p>

            <form
              className="row mt-3 d-flex justify-content-around"
              onSubmit={(event) => event.preventDefault()}
            >
              <button
                type="button"
                onClick={() => {
                  handleSaveChanges();
                }}
                className="text-center col-5 pointer"
              >
                Да
              </button>
              <button onClick={onClose} className="text-center col-5 pointer">
                Не
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveInfoModal;
