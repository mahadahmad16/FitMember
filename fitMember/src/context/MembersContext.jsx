import { createContext, useContext, useMemo } from "react";
import { getEffectiveStatus } from "../components/members/MemberRow";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MembersContext = createContext(null);
const STORAGE_KEY = "fitmember_members";

export function MembersProvider({ children }) {
  const [members, setMembers] = useLocalStorage(STORAGE_KEY, []);

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

  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter((member) => getEffectiveStatus(member) === "Active").length;
    const expired = members.filter((member) => getEffectiveStatus(member) === "Expired").length;
    const suspended = members.filter(
      (member) => getEffectiveStatus(member) === "Suspended"
    ).length;
    return { total, active, expired, suspended };
  }, [members]);

  const value = { members, addMember, deleteMember, toggleMemberStatus, stats };

  return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>;
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be called inside a MembersProvider");
  }
  return context;
}