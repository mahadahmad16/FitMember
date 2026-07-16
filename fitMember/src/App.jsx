import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PlanList from "./components/plans/PlanList";
import MemberForm from "./components/members/MemberForm";
import MemberTable from "./components/members/MemberTable";

const STORAGE_KEY = "ironforge_members";

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
          <span className="home-hero__stat-label">active member{activeCount === 1 ? "" : "s"} on record</span>
        </div>
      </div>
    </section>
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
        <PlanList onChoosePlan={handleChoosePlan} />
      </div>
    </section>
  );
}

function RegisterPage({ onAddMember }) {
  const location = useLocation();
  const presetPlanId = location.state?.planId ?? "";

  return (
    <section className="page-section">
      <div className="container">
        <p className="page-section__eyebrow">Register</p>
        <h2 className="page-section__title">Register a new member</h2>
        <p className="page-section__subtitle">
          Fill in the member's details to create their membership record.
        </p>
        <MemberForm onAddMember={onAddMember} presetPlanId={presetPlanId} />
      </div>
    </section>
  );
}

function ManagePage({ members, onToggleStatus, onDelete }) {
  return (
    <section className="page-section">
      <div className="container">
        <p className="page-section__eyebrow">Manage</p>
        <h2 className="page-section__title">Manage memberships</h2>
        <p className="page-section__subtitle">
          Search members, suspend or reactivate a membership, or remove a record.
        </p>
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

  const activeCount = members.filter((member) => member.status !== "Suspended").length;

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