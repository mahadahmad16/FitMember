import { useNavigate } from "react-router-dom";
import PlanList from "../components/plans/PlanList";

const trustPoints = ["No lock-in contracts", "Prices shown upfront", "Switch or cancel anytime"];

function Plans() {
  const navigate = useNavigate();

  function handleChoosePlan(planId) {
    navigate("/register", { state: { planId } });
  }

  return (
    <section className="page-section">
      <div className="container">
        <p className="page-section__eyebrow">Plans</p>
        <h2 className="page-section__title">Membership plans</h2>
        <p className="page-section__subtitle">
          Pick a plan below to start a registration pre-filled with that plan.
        </p>

        <div className="plans-trust">
          {trustPoints.map((point) => (
            <span className="plans-trust__item" key={point}>
              <span className="plan-card__check">✓</span> {point}
            </span>
          ))}
        </div>

        <PlanList onChoosePlan={handleChoosePlan} />
      </div>
    </section>
  );
}

export default Plans;