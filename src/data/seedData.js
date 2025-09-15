import TestImage1 from "../assets/seed-images/seed_1.jpg";
import TestImage2 from "../assets/seed-images/seed_2.jpg";
import TestImage3 from "../assets/seed-images/seed_3.jpg";
import TestImage4 from "../assets/seed-images/seed_4.jpg";
import TestImage5 from "../assets/seed-images/seed_5.jpg";
import TestImage6 from "../assets/seed-images/seed_6.jpg";
import SeedingData from "../assets/seeding-data/seeding-facilities.json";
import { useLocalStorage } from "./useLocalStorage";

const { setFacilities } = useLocalStorage();

const setSeedData = () => {
    var data = SeedingData.facilities.map((facilityData) => {
        var imageLink;
        switch (facilityData.imageLink) {
          case "seed_1":
            imageLink = TestImage1;
            break;
          case "seed_2":
            imageLink = TestImage2;
            break;
          case "seed_3":
            imageLink = TestImage3;
            break;
          case "seed_4":
            imageLink = TestImage4;
            break;
          case "seed_5":
            imageLink = TestImage5;
            break;
          case "seed_6":
          default:
            imageLink = TestImage6;
            break;
        }
        return {...facilityData, imageLink: imageLink}
      });
      setFacilities(data);
}

export default setSeedData;