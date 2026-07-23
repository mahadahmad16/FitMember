import { useState, useEffect } from "react";
import plansData from "../../data/plansData";
import { useMembers } from "../../context/MembersContext";
import { validateMemberForm } from "../../utils/validators";
import { addOneMonth, getTodayISODate } from "../../utils/helpers";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  planId: "",
  startDate: getTodayISODate(),
};

function MemberForm({ presetPlanId }) {
  const { addMember } = useMembers();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (presetPlanId) {
      setForm((prev) => ({ ...prev, planId: presetPlanId }));
    }
  }, [presetPlanId]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateMemberForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const newMember = {
      id: Date.now(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      age: Number(form.age),
      gender: form.gender,
      planId: form.planId,
      joinDate: getTodayISODate(),
      startDate: form.startDate,
      expiryDate: addOneMonth(form.startDate),
      status: "Active",
    };

    addMember(newMember);
    setForm({ ...emptyForm, startDate: getTodayISODate() });
    setSuccessMessage(`${newMember.fullName} was registered successfully.`);
  }

  return (
    <form className="member-form" noValidate onSubmit={handleSubmit}>
      {successMessage && (
        <div className="app-alert app-alert--success" role="status">
          {successMessage}
        </div>
      )}

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="fullName">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            placeholder="e.g. Ayesha Khan"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="e.g. ayesha@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="phone">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            placeholder="e.g. 0300-1234567"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-6 col-md-3">
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            placeholder="e.g. 24"
            value={form.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="col-6 col-md-3">
          <label className="form-label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="planId">
            Membership plan
          </label>
          <select
            id="planId"
            name="planId"
            className={`form-select ${errors.planId ? "is-invalid" : ""}`}
            value={form.planId}
            onChange={handleChange}
          >
            <option value="">Select a plan</option>
            {plansData.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} — Rs. {plan.price.toLocaleString()} {plan.duration}
              </option>
            ))}
          </select>
          {errors.planId && <div className="invalid-feedback">{errors.planId}</div>}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="startDate">
            Start date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
            value={form.startDate}
            onChange={handleChange}
          />
          {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
        </div>
      </div>

      <button type="submit" className="btn-plate btn-plate--solid member-form__submit">
        Register member
      </button>
    </form>
  );
}

export default MemberForm;