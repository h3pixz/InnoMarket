import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import logo from '../assets/logo.png';
import '../styles/admin.css';

const NAV = [
  { label: 'Maintain Items', to: '/admin' },
  { label: 'Master Data', to: '/admin/master-data' },
  { label: 'User Management', to: '/admin/user-management' },
  { label: 'Reporting', to: '/admin/reporting' },
  { label: 'Settlement BC', to: '/admin/settlement-bc' },
];

export default function AdminLayout() {
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

          <nav className="admin-nav">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'admin-nav__link admin-nav__link--active'
                    : 'admin-nav__link'
                }
              >
                {item.label}
              </NavLink>
            ))}
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
