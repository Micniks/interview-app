import React, { useCallback } from "react";
import "./styles.css";
import LocationIcon from "../../assets/svg/location_icon.svg";
import DefaultFacilityIcon from "../../assets/svg/favorite_facility.svg";
import TrashIcon from "../../assets/svg/trash_icon.svg";
import OpenClosedLabel from "../open-closed-label/open-closed-label-component";
import IconButton from "../icon-button/icon-button-component";

const FacilityCard = (props) => {
  const {
    id,
    name,
    address,
    description, // Not currently used in Figma design other than on create/edit page.
    imageLink,
    openingTime,
    closingTime,
    isDefault,
    onEdit,
    onDelete
  } = props;

  const isFacilityOpen = useCallback((openingTime, closingTime) => {
    var currentDate = new Date();

    var startDate = new Date(currentDate.getTime());
    startDate.setHours(openingTime.split(":")[0]);
    startDate.setMinutes(openingTime.split(":")[1]);
    startDate.setSeconds(openingTime.split(":")[2]);

    var endDate = new Date(currentDate.getTime());
    endDate.setHours(closingTime.split(":")[0]);
    endDate.setMinutes(closingTime.split(":")[1]);
    endDate.setSeconds(closingTime.split(":")[2]);

    return startDate < currentDate && endDate > currentDate;
  }, [])

  //TODO: 13-09-2025 - Update with delete logic here
  const deleteClicked = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  //TODO: 13-09-2025 - Update with edit logic here
  const editClicked = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  return (
    <div className="card-container">
      <div className="image-container">
        <div className="card-image" style={{ backgroundImage: `url(${imageLink})`}} alt="Facility Image" />
        {isDefault && (
          <img className="card-default-icon" src={DefaultFacilityIcon} alt="Default facility" />
        )}
      </div>

      <div className="card-content">
        <div className="card-top-row">
          <p className="card-title">{name}</p>
          <OpenClosedLabel isOpen={isFacilityOpen(openingTime, closingTime)}/>
        </div>
        <div className="card-bottom-row">
          <div className="card-location">
            <img className="location-icon" src={LocationIcon} alt="Location" />
            <p className="location-text small-text">{address}</p>
          </div>
          <div className="card-actions">
            <IconButton iconLink={TrashIcon} iconAltText={"Delete Button"} onClick={deleteClicked}/>
            <button className="edit-button" onClick={editClicked}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
