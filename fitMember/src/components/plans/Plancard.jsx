function PlanCard({ plan, onChoose }) {
  const { name, price, duration, description, features, highlighted } = plan;

  return (
    <div className={`plan-card ${highlighted ? "plan-card--highlighted" : ""}`}>
      {highlighted && <div className="plan-card__tag">Most picked</div>}

      <h3 className="plan-card__name">{name}</h3>
      <p className="plan-card__desc">{description}</p>

      <div className="plan-card__price">
        <span className="plan-card__price-currency">Rs.</span>
        <span className="plan-card__price-amount">{price.toLocaleString()}</span>
        <span className="plan-card__price-duration">{duration}</span>
      </div>

      <div className="rep-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <ul className="plan-card__features">
        {features.map((feature, index) => (
          <li key={index}>
            <span className="plan-card__check">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`btn-plate ${highlighted ? "btn-plate--solid" : "btn-plate--outline"}`}
        onClick={() => onChoose && onChoose(plan.id)}
      >
        Choose {name}
      </button>
    </div>
  );
}

export default PlanCard;