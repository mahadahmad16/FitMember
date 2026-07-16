function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container app-footer__inner">
        <span className="app-footer__brand">IRONFORGE GYM</span>
        <span className="app-footer__copy">© {year} Ironforge Fitness. All rights reserved.</span>
        <span className="app-footer__note">Built for the Gym Membership System project.</span>
      </div>
    </footer>
  );
}

export default Footer;