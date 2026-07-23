function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container app-footer__inner">
        <span className="app-footer__brand">FITMEMBER</span>
        <span className="app-footer__copy">© {year} FITMEMBER. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;