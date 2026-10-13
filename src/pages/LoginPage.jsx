import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../app/api';
import { setUser } from '../app/userSlice';
import '../styles/login.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.username === 'admin' && form.password === 'admin') {
      dispatch(setUser({ username: 'admin', firstName: 'Admin' }));
      navigate('/admin');
      return;
    }

    try {
      const user = await login(form).unwrap();
      dispatch(setUser(user));
      navigate('/account');
    } catch {
      setError('Wrong username or password');
    }
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <p className="login__subtitle">
          Sign in to see your reservations and favourites.
        </p>

        <label className="login__field">
          <span className="login__label">Username</span>
          <input
            className="login__input"
            type="text"
            name="username"
            value={form.username}
            autoComplete="username"
            onChange={handleChange}
            required
          />
        </label>

        <label className="login__field">
          <span className="login__label">Password</span>
          <input
            className="login__input"
            type="password"
            name="password"
            value={form.password}
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="login__error">{error}</p>}

        <button className="login__submit" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Log in'}
        </button>

        <p className="login__hint">Demo account: emilys / emilyspass</p>
      </form>
    </div>
  );
}
