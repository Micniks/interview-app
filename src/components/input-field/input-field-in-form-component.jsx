import React, { useEffect } from "react";
import "./styles.css";
import { Pattern } from "@mui/icons-material";

const InputFieldInForm = ({
  isRequired,
  validateInputCallback,
  error,
  headerText,
  fieldName,
  inputType,
  formRegister,
  style,
  disabled
}) => {
  var inputClass = "small-text input-field";
  if (inputType == "textarea") inputClass += " input-field-text-area";
  if (error) inputClass += " input-field-error";

  var validationObject = {
    required: isRequired ? `${headerText ?? "field"} is required` : false,
  };
  if (validateInputCallback != undefined) {
    validationObject = { ...validationObject, validate: validateInputCallback };
  }
  if (!style) style = {};
  if (!disabled) disabled = false;

  return (
    <div className="input-container">
      {headerText && (
        <div className="input-text-container">
          <p className="small-text input-header-text">{headerText}</p>
          {isRequired && <p className="small-text input-header-asterisks">*</p>}
        </div>
      )}
      {inputType == "textarea" ? (
        <textarea
          {...formRegister(fieldName, validationObject)}
          className={inputClass}
          style={style}
          disabled={disabled}
        />
      ) : (
        <input
          {...formRegister(fieldName, validationObject)}
          className={inputClass}
          type={inputType ?? "text"}
          style={style}
          disabled={disabled}
        />
      )}
      {error && <p className="small-text input-error-text">{error.message}</p>}
    </div>
  );
};

export default InputFieldInForm;
