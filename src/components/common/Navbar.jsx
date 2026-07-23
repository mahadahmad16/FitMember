import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/plans", label: "Plans" },
  { to: "/register", label: "Register" },
  { to: "/manage", label: "Manage Members" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="app-navbar">
      <div className="container app-navbar__inner">
        <NavLink to="/" className="app-navbar__brand" onClick={() => setOpen(false)}>
          <span className="app-navbar__brand-mark">FM</span>
          FITMEMBER
        </NavLink>

        <button
          type="button"
          className="app-navbar__toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`app-navbar__links ${open ? "app-navbar__links--open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `app-navbar__link ${isActive ? "app-navbar__link--active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;