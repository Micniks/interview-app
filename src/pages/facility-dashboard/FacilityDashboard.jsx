import React, { useCallback, useRef, useState } from "react";
import AppTopBar from "../../components/top-bar/top-bar-component";
import FacilityCard from "../../components/facility-card/facility-card-component";
import "../page-styles.css";
import "./styles.css";
import { useNavigate, Link } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import config from "../../config.json";
import getSeedData from "../../data/seedData";
import TwoActionDialog from "../../components/dialogs/two-action-dialog";

const FacilityDashboard = () => {
  const navigate = useNavigate();
  const [facilityData, setFacilityData] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const deleteDialogRef = useRef(null);

  // ONLY FOR DEVELOPMENT - To easily showcase work
  const insertSeedData = useCallback(() => {
    setFacilityData(getSeedData());
  }, [getSeedData]);

  const goToCreateFacility = useCallback(() => {
    navigate(`/facility`);
  }, []);

  const onEditFacility = useCallback((facilityId) => {
    navigate(`/facility?id=${facilityId}`);
  }, []);

  const onDeleteFacility = useCallback((facilityId, data) => {
    if (!deleteDialogRef.current) return;
    setSelectedFacility(getFacilityById(facilityId, data));
    deleteDialogRef.current.showModal();
  }, []);

  // DEV NOTE: This should be a call to a BE, and afterwards, we should re-fetch the data list.
  const removeSelectedFacility = () => {
    var updatedList = facilityData.filter(
      (facility) => facility.id != selectedFacility?.id
    );
    setFacilityData(updatedList);
  };

  const getFacilityById = (id, data) => {
    return data.find((facility) => facility.id == id);
  };

  return (
    <div className="outer-page-container">
      <AppTopBar />
      <div className="inner-page-container">
        <div className="action-buttons">
          {config.build_env == "TEST" && facilityData.length == 0 && (
            <button onClick={insertSeedData} className="seed-button">
              Seed Data
            </button>
          )}
          <button onClick={goToCreateFacility} className="create-button">
            Create Facility
          </button>
        </div>
        <div className="facility-grid">
          {facilityData.map((facility) => (
            <FacilityCard
              key={facility.id}
              id={facility.id}
              name={facility.name}
              address={facility.address}
              description={facility.description}
              imageLink={facility.imageLink}
              openingTime={facility.openingTime}
              closingTime={facility.closingTime}
              isDefault={facility.isDefault}
              onDelete={() => {
                onDeleteFacility(facility.id, facilityData);
              }}
              onEdit={onEditFacility}
            />
          ))}
        </div>
      </div>
      <TwoActionDialog
        dialogRef={deleteDialogRef}
        onPositiveAction={removeSelectedFacility}
        title={"Delete Facility"}
        description={
          selectedFacility && (
            <div style={{ maxWidth: "390px" }}>
              <p style={{ margin: "0px" }}>
                Are you sure you want to delete this facility? This action
                cannot be undone.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <p style={{ margin: "0px" }}>
                  Facility:{" "}
                  <span style={{ margin: "0px", fontWeight: "bold" }}>
                    {selectedFacility?.name}
                  </span>
                </p>
              </div>
            </div>
          )
        }
        positiveButtonText={"Yes, Delete"}
        negativeButtonText={"Cancel"}
      />
    </div>
  );
};

export default FacilityDashboard;
