import { NavLink } from 'react-router-dom';
import Logo from "./Logo";
import classnames from 'classnames';
import HeaderSearch from "./HeaderSearch";
import HeaderCart from "./HeaderCart";

const menu = [
  {link:"/", name:"Главная"},
  {link:"/catalog", name:"Каталог"},
  {link:"/about", name:"О магазине"},
  {link:"/contacts", name:"Контакты"}
];

export default function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Logo />
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {menu.map((item, index) =>
                  <NavLink
                    className={ ({ isActive }) => classnames("nav-link", { "active": isActive }) }
                    key={index}
                    to={item.link}
                    >
                      <li className="nav-item">
                        {item.name}
                      </li>
                  </NavLink>
                )}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <HeaderSearch />
                  <HeaderCart />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};