import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, show, handleClose }) => {
  const showHideClassName = show
    ? "modal-container display-block"
    : "modal-container display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  handleClose: PropTypes.func,
  show: PropTypes.bool
};

Modal.defaultProps = {
  children: {},
  handleClose: () => {},
  show: false
};

export default Modal;
