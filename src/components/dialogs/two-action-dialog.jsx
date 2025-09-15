import { useCallback } from "react";
import IconButton from "../icon-button/icon-button-component";
import closeIcon from "../../assets/svg/close_icon.svg";

import "./styles.css";

const TwoActionDialog = ({
  dialogRef,
  onPositiveAction,
  onNegativeAction,
  onCloseAction,
  title,
  description,
  positiveButtonText,
  negativeButtonText,
}) => {
  const doNegativeActionDialog = useCallback(() => {
    dialogRef.current.close();
    onNegativeAction && onNegativeAction();
  }, [onNegativeAction, dialogRef]);

  const doPositiveActionDialog = useCallback(() => {
    dialogRef.current.close();
    onPositiveAction && onPositiveAction();
  }, [onPositiveAction, dialogRef]);

  const closeDialog = useCallback(() => {
    dialogRef.current.close();
    onCloseAction && onCloseAction();
  }, [onCloseAction, dialogRef]);

  const closeDialogOnOutsideClicked = useCallback((e) => {
    if (e.currentTarget === e.target) closeDialog();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="dialog-style"
      onClick={closeDialogOnOutsideClicked}
    >
      <div className="dialog-container">
        <div className="dialog-top-row">
          <p className="dialog-title">{title}</p>
          <IconButton
            iconLink={closeIcon}
            iconAltText="Close dialog"
            onClick={closeDialog}
          />
        </div>
      </div>
      <div className="dialog-description">{description}</div>
      <div className="dialog-action-buttons">
        <button
          className="dialog-negative-button"
          onClick={doNegativeActionDialog}
        >
          {negativeButtonText}
        </button>
        <button
          className="dialog-positive-button"
          onClick={doPositiveActionDialog}
        >
          {positiveButtonText}
        </button>
      </div>
    </dialog>
  );
};

export default TwoActionDialog;
