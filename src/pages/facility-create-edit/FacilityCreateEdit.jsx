import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppTopBar from "../../components/top-bar/top-bar-component";
import "../page-styles.css";
import "./styles.css";
import InputFieldInForm from "../../components/input-field/input-field-in-form-component";
import { useLocalStorage } from "../../data/useLocalStorage";
import { useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const FacilityCreateEdit = () => {
  const navigate = useNavigate();
  const { getFacility, setFacility, getFacilities } = useLocalStorage();
  const { id } = useParams();
  const [forceDefault, setForceDefault] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    // Add values to fields on edit
    if (id) {
      var facility = getFacility(id);
      if (facility) {
        setValue("name", facility.name);
        setValue("address", facility.address);
        setValue("description", facility.description);
        setValue("imageLink", facility.imageLink);
        setValue("openingTime", facility.openingTime);
        setValue("closingTime", facility.closingTime);
        setValue("isDefault", facility.isDefault);
      }
    }
    var facilities = getFacilities();
    if (
      facilities.length == 0 ||
      (facilities.length == 1 && id == facilities[0].id)
    ) {
      setForceDefault(true);
      setValue("isDefault", true);
    }
  }, [id]);

  const onSubmit = async (data) => {
    // DEV NOTE: To mimic communication with database
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // DEV NOTE: Use below line to test error handling example
      // throw Error("name");
      // throw Error("other");

      if (id) data = { ...data, id: id };
      setFacility(data);
      navigate(`/`);
    } catch (error) {
      console.error(error);
      handleSubmitError(error);
    }
  };

  const handleSubmitError = useCallback(
    (error) => {
      // DEV NOTE: To mimic error from DB, like if name for facility is already taken
      if (error.message == "name")
        setError("name", {
          message: "Facility name is already taken",
        });
      else
        setError("root", {
          message:
            "Facility could not be created as this time. Check your internet, or contact our customer support team.",
        });
    },
    [setError]
  );

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/`);
    },
    [navigate]
  );

  return (
    <div className="outer-page-container">
      <AppTopBar />
      <div className="inner-page-container">
        <h2>Create a New Facility</h2>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="form-header-text">Facility Information</h3>
          <div className="input-container">
            <InputFieldInForm
              isRequired={true}
              error={errors.name}
              headerText={"Facility Name"}
              fieldName={"name"}
              inputType={"text"}
              formRegister={register}
            />
          </div>
          <div className="input-container">
            <InputFieldInForm
              isRequired={true}
              error={errors.address}
              headerText={"Address"}
              fieldName={"address"}
              inputType={"text"}
              formRegister={register}
            />
          </div>
          <div className="input-container">
            <InputFieldInForm
              isRequired={true}
              error={errors.description}
              headerText={"Description"}
              fieldName={"description"}
              inputType={"textarea"}
              formRegister={register}
            />
          </div>
          <div className="input-container">
            <InputFieldInForm
              isRequired={true}
              error={errors.imageLink}
              headerText={"Cover Image URL"}
              fieldName={"imageLink"}
              inputType={"text"}
              formRegister={register}
            />
          </div>
          <div className="checkbox-field">
            <InputFieldInForm
              error={errors.checkbox}
              fieldName={"isDefault"}
              inputType={"checkbox"}
              formRegister={register}
              style={{ width: "20px", height: "20px" }}
              disabled={forceDefault}
            />
            <div className="checkbox-text-container">
              <p className="checkbox-header">Default Facility</p>
              <p className="checkbox-description">
                Setting this facility as default will override the currently
                marked default facility.
              </p>
            </div>
          </div>
          <h3 className="form-header-text">Working Hours</h3>
          <div className="time-input-container">
            <div className="input-container">
              <InputFieldInForm
                isRequired={true}
                error={errors.openingTime}
                headerText={"Opening Time"}
                fieldName={"openingTime"}
                inputType={"time"}
                formRegister={register}
              />
            </div>
            <div className="input-container">
              <InputFieldInForm
                isRequired={true}
                error={errors.closingTime}
                headerText={"Closing Time"}
                fieldName={"closingTime"}
                inputType={"time"}
                formRegister={register}
              />
            </div>
          </div>
          <div className="error-texts">
            {errors.root && (
              <p className="form-error-text">{errors.root.message}</p>
            )}
          </div>

          <div className="button-row">
            <button disabled={isSubmitting} onClick={goBack}>
              Cancel
            </button>
            <button
              className="create-button"
              type="Submit"
              disabled={isSubmitting}
            >
              {id ? "Update Facility" : "Create Facility"}
            </button>
          </div>
        </form>
      </div>
      {isSubmitting && (
        <div className="loading_modal">
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={100} color="inherit" />
          </Box>
        </div>
      )}
    </div>
  );
};

export default FacilityCreateEdit;
