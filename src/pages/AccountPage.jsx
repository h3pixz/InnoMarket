import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useGetUsersQuery } from '../app/api';
import { logout, selectUser } from '../app/userSlice';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/account.css';

export default function AccountPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetUsersQuery();

  if (!user) return <Navigate to="/login" replace />;

  const isAdmin = user.username === 'admin';
  const profile = data?.users.find((item) => item.id === user.id);
  const address = profile?.address;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="account">
      <Breadcrumbs items={['Home', 'Account']} />

      <section className="account__card">
        <img className="account__avatar" src={user.image} alt="" />

        <div className="account__head">
          <h1 className="account__name">
            {user.firstName} {user.lastName}
          </h1>
          <p className="account__username">@{user.username}</p>
        </div>

        <div className="account__contacts">
          <p className="account__row">
            <FaEnvelope className="account__icon" />
            <span>{user.email}</span>
          </p>
          {profile?.phone && (
            <p className="account__row">
              <FaPhone className="account__icon" />
              <span>{profile.phone}</span>
            </p>
          )}
          {address && (
            <p className="account__row">
              <FaMapMarkerAlt className="account__icon" />
              <span>
                {address.address}, {address.city}, {address.country}
              </span>
            </p>
          )}
        </div>

        <div className="account__links">
          <Link className="account__link" to="/reserved">
            My reservations
          </Link>
          <Link className="account__link" to="/likes">
            Favorites
          </Link>
          {isAdmin && (
            <Link className="account__link" to="/admin">
              Admin panel
            </Link>
          )}
        </div>

        <button className="account__logout" type="button" onClick={handleLogout}>
          Log out
        </button>
      </section>
    </div>
  );
}
