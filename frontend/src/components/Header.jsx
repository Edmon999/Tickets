import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Tickets</Link>
      </div>
      <ul>
        {user ? (
          <li>
            {" "}
            <button className="btn" onClick={onLogout}>
              {" "}
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                {" "}
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                {" "}
                <FaSignOutAlt /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
