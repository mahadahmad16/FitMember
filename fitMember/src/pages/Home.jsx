import { Link } from "react-router-dom";
import { useMembers } from "../context/MembersContext";

const features = [
  {
    title: "Real plans, real pricing",
    desc: "Basic, Standard, and Premium are laid out with the price and perks up front, so nobody has to call in to find out what something costs.",
  },
  {
    title: "One record, always current",
    desc: "The moment a member registers, their plan, start date, and expiry are locked in and reflected everywhere in the system.",
  },
  {
    title: "No lock-in contracts",
    desc: "Suspend a membership during a quiet month or remove it entirely — the front desk stays in control.",
  },
  {
    title: "Built for the front desk",
    desc: "Search by name, read status at a glance, and update a record in a couple of clicks.",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse plans",
    desc: "Compare Basic, Standard, and Premium side by side and pick what fits.",
  },
  {
    number: "02",
    title: "Register in minutes",
    desc: "Fill in the member's details once — the plan and dates carry over automatically.",
  },
  {
    number: "03",
    title: "Manage anytime",
    desc: "Search, suspend, reactivate, or remove a membership from one table.",
  },
];

function Home() {
  const { stats } = useMembers();

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__graphic" aria-hidden="true">
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="300" r="280" className="home-hero__ring home-hero__ring--outer" />
            <circle cx="300" cy="300" r="210" className="home-hero__ring home-hero__ring--mid" />
            <circle cx="300" cy="300" r="140" className="home-hero__ring home-hero__ring--inner" />
            <circle cx="300" cy="300" r="46" className="home-hero__ring home-hero__ring--core" />
          </svg>
        </div>

        <div className="container">
          <p className="home-hero__eyebrow">Gym Membership System</p>
          <h1 className="home-hero__title">
            Run the front desk
            <br />
            without the paper trail.
          </h1>
          <p className="home-hero__subtitle">
            Show your plans, register new members, and keep every membership status straight — all
            in one place.
          </p>

          <div className="home-hero__actions">
            <Link to="/plans" className="btn-plate btn-plate--solid">
              View plans
            </Link>
            <Link to="/register" className="btn-plate btn-plate--outline">
              Register a member
            </Link>
          </div>

          <div className="rep-bar rep-bar--wide" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="home-hero__stat">
            <span className="home-hero__stat-number">{stats.active}</span>
            <span className="home-hero__stat-label">
              active member{stats.active === 1 ? "" : "s"} on record
            </span>
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <p className="page-section__eyebrow">Why FitMember</p>
          <h2 className="page-section__title">Less admin. More gym.</h2>

          <div className="home-features">
            {features.map((feature, index) => (
              <div className="home-feature-card" key={feature.title}>
                <span className="home-feature-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="home-feature-card__title">{feature.title}</h3>
                <p className="home-feature-card__desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <p className="page-section__eyebrow">How it works</p>
          <h2 className="page-section__title">Three steps, start to finish</h2>

          <div className="home-steps">
            {steps.map((step) => (
              <div className="home-step" key={step.number}>
                <span className="home-step__number">{step.number}</span>
                <h3 className="home-step__title">{step.title}</h3>
                <p className="home-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="home-cta">
            <h2 className="home-cta__title">Ready to add your first member?</h2>
            <Link to="/register" className="btn-plate btn-plate--solid">
              Register a member
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;