import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PlanList from "./components/plans/PlanList";
import plansData from "./components/plans/plansData";
import MemberForm from "./components/members/MemberForm";
import MemberTable from "./components/members/MemberTable";
import { getEffectiveStatus } from "./components/members/MemberRow";

const STORAGE_KEY = "fitmember_members";

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

const trustPoints = ["No lock-in contracts", "Prices shown upfront", "Switch or cancel anytime"];

const registerChecklist = [
  "Full name",
  "Active email address",
  "Phone number",
  "Age, between 12 and 80",
  "A membership plan",
];

function loadMembers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function HomePage({ activeCount }) {
  return (
    <>
      <section className="home-hero">
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
            <span className="home-hero__stat-number">{activeCount}</span>
            <span className="home-hero__stat-label">
              active member{activeCount === 1 ? "" : "s"} on record
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

function PlansPage() {
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

function RegisterPage({ onAddMember }) {
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
          <MemberForm onAddMember={onAddMember} presetPlanId={presetPlanId} />

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

function ManagePage({ members, onToggleStatus, onDelete }) {
  const total = members.length;
  const activeCount = members.filter((member) => getEffectiveStatus(member) === "Active").length;
  const expiredCount = members.filter((member) => getEffectiveStatus(member) === "Expired").length;
  const suspendedCount = members.filter(
    (member) => getEffectiveStatus(member) === "Suspended"
  ).length;

  return (
    <section className="page-section">
      <div className="container">
        <p className="page-section__eyebrow">Manage</p>
        <h2 className="page-section__title">Manage memberships</h2>
        <p className="page-section__subtitle">
          Search members, suspend or reactivate a membership, or remove a record.
        </p>

        <div className="manage-stats">
          <div className="manage-stat-card">
            <span className="manage-stat-card__value">{total}</span>
            <span className="manage-stat-card__label">Total members</span>
          </div>
          <div className="manage-stat-card manage-stat-card--active">
            <span className="manage-stat-card__value">{activeCount}</span>
            <span className="manage-stat-card__label">Active</span>
          </div>
          <div className="manage-stat-card manage-stat-card--expired">
            <span className="manage-stat-card__value">{expiredCount}</span>
            <span className="manage-stat-card__label">Expired</span>
          </div>
          <div className="manage-stat-card manage-stat-card--suspended">
            <span className="manage-stat-card__value">{suspendedCount}</span>
            <span className="manage-stat-card__label">Suspended</span>
          </div>
        </div>

        <MemberTable members={members} onToggleStatus={onToggleStatus} onDelete={onDelete} />
      </div>
    </section>
  );
}

function App() {
  const [members, setMembers] = useState(loadMembers);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  function addMember(newMember) {
    setMembers((prev) => [...prev, newMember]);
  }

  function deleteMember(id) {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  }

  function toggleMemberStatus(id) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, status: member.status === "Suspended" ? "Active" : "Suspended" }
          : member
      )
    );
  }

  const activeCount = members.filter(
    (member) => getEffectiveStatus(member) === "Active"
  ).length;

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage activeCount={activeCount} />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/register" element={<RegisterPage onAddMember={addMember} />} />
          <Route
            path="/manage"
            element={
              <ManagePage
                members={members}
                onToggleStatus={toggleMemberStatus}
                onDelete={deleteMember}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;