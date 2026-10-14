import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import logo from '../assets/logo.png';
import '../styles/admin.css';

const NAV = [
  { label: 'Maintain Items', to: '/admin' },
  { label: 'Master Data' },
  { label: 'User Management', to: '/admin/users/new' },
  { label: 'Reporting' },
  { label: 'Settlement BC' },
];

export default function AdminLayout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header__left">
          <Link to="/admin" className="admin-brand">
            <img className="admin-brand__logo" src={logo} alt="InnoMarket" />
            <div className="admin-brand__titles">
              <p className="admin-brand__title">Inno</p>
              <p className="admin-brand__title">Market</p>
              <span className="admin-brand__sub">Backoffice</span>
            </div>
          </Link>

          <button
            type="button"
            className="admin-burger"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            aria-controls="admin-nav"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav
            id="admin-nav"
            className={`admin-nav${navOpen ? ' admin-nav--open' : ''}`}
          >
            {NAV.map(({ label, to }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  className="admin-nav__link"
                  onClick={() => setNavOpen(false)}
                >
                  {label}
                </Link>
              ) : (
                <span key={label} className="admin-nav__link">
                  {label}
                </span>
              )
            )}
          </nav>
        </div>

        <div className="admin-header__right">
          <Link to="/" className="admin-checkout">
            Checkout
          </Link>
          <button type="button" className="admin-profile" aria-label="Profile">
            <FaUser className="admin-profile__icon" />
            <IoIosArrowDown className="admin-profile__chevron" />
          </button>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
