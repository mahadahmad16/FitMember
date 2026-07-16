import plansData from "../plans/plansData";

export function getEffectiveStatus(member) {
  if (member.status === "Suspended") return "Suspended";
  const today = new Date().toISOString().slice(0, 10);
  if (member.expiryDate < today) return "Expired";
  return "Active";
}

function MemberRow({ member, onToggleStatus, onDelete }) {
  const plan = plansData.find((item) => item.id === member.planId);
  const status = getEffectiveStatus(member);

  return (
    <tr>
      <td data-label="Name">
        <div className="member-row__name">{member.fullName}</div>
        <div className="member-row__sub">{member.email}</div>
      </td>
      <td data-label="Phone">{member.phone}</td>
      <td data-label="Plan">{plan ? plan.name : "—"}</td>
      <td data-label="Start date">{member.startDate}</td>
      <td data-label="Expiry date">{member.expiryDate}</td>
      <td data-label="Status">
        <span className={`status-tag status-tag--${status.toLowerCase()}`}>{status}</span>
      </td>
      <td data-label="Actions" className="member-row__actions">
        <button
          type="button"
          className="btn-plate btn-plate--outline btn-plate--small"
          onClick={() => onToggleStatus(member.id)}
        >
          {member.status === "Suspended" ? "Reactivate" : "Suspend"}
        </button>
        <button
          type="button"
          className="btn-plate btn-plate--danger btn-plate--small"
          onClick={() => onDelete(member.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default MemberRow;