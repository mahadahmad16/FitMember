import plansData from "../../data/plansData";
import PlanCard from "./Plancard";

function PlanList({ onChoosePlan }) {
  return (
    <div className="row g-4">
      {plansData.map((plan) => (
        <div className="col-12 col-md-6 col-lg-4" key={plan.id}>
          <PlanCard plan={plan} onChoose={onChoosePlan} />
        </div>
      ))}
    </div>
  );
}

export default PlanList;