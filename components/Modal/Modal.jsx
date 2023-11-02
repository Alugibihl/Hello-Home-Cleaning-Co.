import "./Modal.css";

const Modal = ({
  component: Component,
  close,
  modalFunctions,
  values = {},
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img
          className="close-button"
          src="/CloseModal.png"
          onClick={() => close(false)}
        />
        <Component
          close={close}
          modalFunctions={modalFunctions}
          values={values}
        />
      </div>
    </div>
  );
};

export default Modal;