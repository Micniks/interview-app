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
    description,
    imageLink,
    openingTime,
    closingTime,
    isDefault,
  } = props;

  const isFacilityOpen = (openingTime, closingTime) => {
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
  };

  //TODO: 13-09-2025 - Update with delete logic here
  const deleteClicked = useCallback(() => {
    console.log("DELETE FACILITY " + id);
  }, [id]);

  //TODO: 13-09-2025 - Update with delete logic here
  const editClicked = useCallback(() => {
    console.log("EDIT FACILITY " + id);
  }, [id]);

  return (
    <div class="card-container">
      <div class="image-container">
        <img class="card-image" src={imageLink} alt="" />
        {isDefault && (
          <img class="card-default-icon" src={DefaultFacilityIcon} alt="" />
        )}
      </div>

      <div class="card-content">
        <div class="card-top-row">
          <p class="card-title">{name}</p>
          <OpenClosedLabel isOpen={isFacilityOpen(openingTime, closingTime)}/>
        </div>
        <div class="card-bottom-row">
          <div class="card-location">
            <img clss="location-icon" src={LocationIcon} alt="Location" />
            <p class="location-text small-text">{address}</p>
          </div>
          <div class="card-actions">
            <IconButton iconLink={TrashIcon} iconAltText={"Delete Button"} onClick={deleteClicked}/>
            <button className="edit-button" onClick={editClicked}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
