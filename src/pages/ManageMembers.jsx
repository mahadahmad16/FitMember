import MemberTable from "../components/members/MemberTable";
import { useMembers } from "../context/MembersContext";

function ManageMembers() {
  const { stats } = useMembers();

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
            <span className="manage-stat-card__value">{stats.total}</span>
            <span className="manage-stat-card__label">Total members</span>
          </div>
          <div className="manage-stat-card manage-stat-card--active">
            <span className="manage-stat-card__value">{stats.active}</span>
            <span className="manage-stat-card__label">Active</span>
          </div>
          <div className="manage-stat-card manage-stat-card--expired">
            <span className="manage-stat-card__value">{stats.expired}</span>
            <span className="manage-stat-card__label">Expired</span>
          </div>
          <div className="manage-stat-card manage-stat-card--suspended">
            <span className="manage-stat-card__value">{stats.suspended}</span>
            <span className="manage-stat-card__label">Suspended</span>
          </div>
        </div>

        <MemberTable />
      </div>
    </section>
  );
}

export default ManageMembers;