import "./Modal.css";

const Modal = ({ component: Component, close, modalFunctions }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img
          className="close-button"
          src="/CloseModal.png"
          onClick={() => close(false)}
        />
        <Component close={close} modalFunctions={modalFunctions} />
      </div>
    </div>
  );
};

export default Modal;
