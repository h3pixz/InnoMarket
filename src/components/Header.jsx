import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { FaUser, FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { selectCartCount, selectFavoritesCount } from "../app/cartSlice";
import logo from "../assets/logo.png";

export default function Header() {
  const favoritesCount = useSelector(selectFavoritesCount);
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    const trimmed = value.trim();
    navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/", {
      replace: true,
    });
  };

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
        <form
          className="header__searchbox"
          onSubmit={(event) => event.preventDefault()}
        >
          <IoIosSearch className="header__icon" />
          <input
            className="header__search"
            type="search"
            aria-label="Search"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />
        </form>
      </div>

      <button
        type="button"
        className="header__burger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="header-nav"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        id="header-nav"
        className={`header__navrow${menuOpen ? " header__navrow--open" : ""}`}
      >
        <nav className="header__nav">
          <NavLink
            to="/about"
            className="header__link"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </NavLink>
          <NavLink
            to="/shops"
            className="header__link"
            onClick={() => setMenuOpen(false)}
          >
            All shops
          </NavLink>
          <NavLink
            to="/merchant"
            className="header__link"
            onClick={() => setMenuOpen(false)}
          >
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

          <Link to="/account" className="header__profile" aria-label="Profile">
            <FaUser />
          </Link>
        </div>
      </div>
    </header>
  );
}
