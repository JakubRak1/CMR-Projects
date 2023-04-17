import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "../static/styles/actionBar.css";

const ActionBar = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-row action-bar justify-content-between">
        <button className="action-btn">
          <span>Dodaj Nowe</span>
        </button>
        <button className="action-btn">
          <span className="text">Usuń zaznaczone??</span>
        </button>
        <div className="d-flex flex-row align-items-center">
          <span className="text sorting-text action-text">Sortuj : </span>
          <div className="d-flex flex-row">
            <button className="text d-flex flex-row action-btn">
              <span className="next-to-sort-text">Parametr 1</span>
              <div className="d-flex flex-column">
                <FontAwesomeIcon className="active" icon={faSortUp} />
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </button>
            <button className="text d-flex flex-row action-btn">
              <span className="next-to-sort-text">Parametr 2</span>
              <div className="d-flex flex-column">
                <FontAwesomeIcon className="active" icon={faSortUp} />
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </button>
            <button className="text d-flex flex-row action-btn">
              <span className="next-to-sort-text">Parametr 3</span>
              <div className="d-flex flex-column">
                <FontAwesomeIcon className="active" icon={faSortUp} />
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </button>
            <button className="text d-flex flex-row action-btn">
              <span className="next-to-sort-text">Parametr 4</span>
              <div className="d-flex flex-column">
                <FontAwesomeIcon className="active" icon={faSortUp} />
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActionBar;
