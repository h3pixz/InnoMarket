import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { selectCartCount, selectFavoritesCount } from "../app/cartSlice";
import logo from "../assets/logo.png";

export default function Header() {
  const favoritesCount = useSelector(selectFavoritesCount);
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="header">
      <div className="header__bar">
        <Link to="/" className="header__brand">
          <img className="header__logo" src={logo} alt="InnoMarket" />
          <div className="header__titles">
            <p className="header__title">Inno</p>
            <p className="header__title">Market</p>
          </div>
        </Link>
        <div className="header__searchbox">
          <IoIosSearch className="header__icon" />
          <input className="header__search" type="search" aria-label="Search" />
        </div>
      </div>

      <div className="header__navrow">
        <nav className="header__nav">
          <NavLink to="/about" className="header__link">
            About us
          </NavLink>
          <NavLink to="/shops" className="header__link">
            All shops
          </NavLink>
          <NavLink to="/merchant" className="header__link">
            Become a merchant
          </NavLink>
        </nav>

        <div className="header__actions">
          <Link to="/likes" className="header__action" aria-label="Favorites">
            <FaHeart />
            <span className="header__number">{favoritesCount}</span>
          </Link>

          <Link to="/reserved" className="header__action" aria-label="Cart">
            <FaShoppingCart />
            <span className="header__number">{cartCount}</span>
          </Link>

          <button type="button" className="header__profile" aria-label="Profile">
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  );
}
