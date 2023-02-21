import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink className="navbar-brand" to="/">
      <img src="/img/header-logo.png" alt="Bosa Noga" />
    </NavLink>
  );
};