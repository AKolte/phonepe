import LocationSelector from "./LocationSelector/index";
import YearQuarterSelector from "./YearQuarterSelector";

const Filters = (showPeriodSelector = false, viewConfigs={format: 'table'}) => {
    
  return (
    <div className="filters">
      <LocationSelector />
      <YearQuarterSelector />
    </div>
  );
};

export default Filters;
