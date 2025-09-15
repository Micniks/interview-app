import "./styles.css";

const IconButton = ({ iconLink, iconAltText, onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <img
        src={iconLink}
        alt={iconAltText ?? "Button"}
        className="inner-icon"
      />
    </button>
  );
};

export default IconButton;
