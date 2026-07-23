import { Link, useLocation } from "react-router-dom";
import MemberForm from "../components/members/MemberForm";
import plansData from "../data/plansData";

const registerChecklist = [
  "Full name",
  "Active email address",
  "Phone number",
  "Age, between 12 and 80",
  "A membership plan",
];

function Register() {
  const location = useLocation();
  const presetPlanId = location.state?.planId ?? "";
  const presetPlan = plansData.find((plan) => plan.id === presetPlanId);

  return (
    <section className="page-section">
      <div className="container">
        <p className="page-section__eyebrow">Register</p>
        <h2 className="page-section__title">Register a new member</h2>
        <p className="page-section__subtitle">
          Fill in the member's details to create their membership record.
        </p>

        <div className="register-layout">
          <MemberForm presetPlanId={presetPlanId} />

          <aside className="register-panel">
            {presetPlan ? (
              <>
                <p className="register-panel__eyebrow">Plan selected</p>
                <h3 className="register-panel__title">{presetPlan.name}</h3>
                <div className="plan-card__price register-panel__price">
                  <span className="plan-card__price-currency">Rs.</span>
                  <span className="plan-card__price-amount">
                    {presetPlan.price.toLocaleString()}
                  </span>
                  <span className="plan-card__price-duration">{presetPlan.duration}</span>
                </div>
                <ul className="register-panel__list">
                  {presetPlan.features.slice(0, 3).map((feature) => (
                    <li key={feature}>
                      <span className="plan-card__check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/plans" className="register-panel__link">
                  Change plan
                </Link>
              </>
            ) : (
              <>
                <p className="register-panel__eyebrow">Before you start</p>
                <h3 className="register-panel__title">You'll need</h3>
                <ul className="register-panel__list">
                  {registerChecklist.map((item) => (
                    <li key={item}>
                      <span className="plan-card__check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/plans" className="register-panel__link">
                  Not sure which plan? Compare plans
                </Link>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Register;