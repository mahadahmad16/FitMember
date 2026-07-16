import { useState } from "react";
import MemberRow from "./MemberRow";
import Modal from "../common/Modal";

function MemberTable({ members, onToggleStatus, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const memberPendingDelete = members.find((member) => member.id === pendingDeleteId);

  function confirmDelete() {
    onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  }

  return (
    <div className="member-table-wrap">
      <div className="member-table-wrap__toolbar">
        <input
          type="search"
          className="form-control"
          placeholder="Search members by name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <span className="member-table-wrap__count">
          {filteredMembers.length} of {members.length} member{members.length === 1 ? "" : "s"}
        </span>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="member-table-wrap__empty">
          {members.length === 0
            ? "No members registered yet. Add one from the Register page."
            : "No members match that search."}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Start date</th>
                <th>Expiry date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  onToggleStatus={onToggleStatus}
                  onDelete={setPendingDeleteId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        show={Boolean(memberPendingDelete)}
        title="Remove member"
        onClose={() => setPendingDeleteId(null)}
        onConfirm={confirmDelete}
        confirmText="Remove"
        confirmVariant="danger"
      >
        {memberPendingDelete && (
          <p>
            Remove <strong>{memberPendingDelete.fullName}</strong>'s membership? This can't be
            undone.
          </p>
        )}
      </Modal>
    </div>
  );
}

export default MemberTable;