import React, { useState } from "react";

const FilterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Product Modal</h2>
        <label>
          <input type="checkbox" />
          Checkbox 1
        </label>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default FilterModal;
