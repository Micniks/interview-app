import React, { useCallback, useState } from "react";
import AppTopBar from "../../components/top-bar/top-bar-component";
import FacilityCard from "../../components/facility-card/facility-card-component";
import "../page-styles.css";
import "./styles.css";

import getSeedData from "../../data/seedData";

const FacilityDashboard = () => {
  const [facilityData, setFacilityData] = useState([]);

  // ONLY FOR DEVELOPMENT - To easily showcase work
  const insertSeedData = useCallback(() => {
    setFacilityData(getSeedData());
  }, [getSeedData]);

  return (
    <div className="outer-page-container">
      <AppTopBar />
      <div className="inner-page-container">
        <button onClick={insertSeedData}>Seed Data</button>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityDashboard;
