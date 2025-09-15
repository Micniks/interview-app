export const useLocalStorage = () => {
  const facilitiesKey = "FACILITIES";
  const facilityIdCountKey = "FACILITY_ID_Count";

  const setFacilities = (value) => {
    try {
      window.localStorage.setItem(facilitiesKey, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const getFacilities = () => {
    try {
      let facilities = window.localStorage.getItem(facilitiesKey);
      if (facilities) return JSON.parse(facilities);
      else {
        setFacilities([]);
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setFacility = (value) => {
    try {
      console.log(value);
      var facilities = getFacilities();
      if (value.isDefault) {
        facilities = facilities.map((facility) => {
          return { ...facility, isDefault: false };
        });
      }
      if (!value.id) {
        value.id = getNewId();
        facilities.push(value);
      } else {
        var idx = facilities.findIndex((facility) => facility.id == value.id);
        if (idx == -1) facilities.push(value);
        else facilities[idx] = value;
      }
      setFacilities(facilities);
    } catch (error) {
      console.error(error);
    }
  };

  const getFacility = (id) => {
    try {
      let facility = getFacilities().find((facility) => (facility.id == id));
      return facility ? facility : undefined;
    } catch (error) {
      console.error(error);
    }
  };

  const removeFaciliy = (id) => {
    try {
      var facilities = getFacilities();
      var idx = facilities.findIndex((facility) => facility.id == id);
      var facilityWasDefault = facilities[idx].isDefault;
      if (idx > -1) {
        facilities.splice(idx, 1);
        if (
          (facilities.length > 1 && facilityWasDefault) ||
          facilities.length == 1
        )
          facilities[0].isDefault = true;
        setFacilities(facilities);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNewId = () => {
    let facilityHighestId = window.localStorage.getItem(facilityIdCountKey);
    facilityHighestId = !facilityHighestId ? 1 : JSON.parse(facilityHighestId);
    try {
      window.localStorage.setItem(
        facilityIdCountKey,
        JSON.stringify(facilityHighestId + 1)
      );
    } catch (error) {
      console.error(error);
    }
    return facilityHighestId;
  };

  return {
    getFacilities,
    setFacilities,
    getFacility,
    setFacility,
    removeFaciliy,
  };
};
