import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashBoardContext } from "../pages/DashboardLayout";
import LogOut from "./LogOut";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
    const { toggleSideBar } = useDashBoardContext();
    return (
        <Wrapper>
            <div className="nav-center">
                <button type='button' className="toggle-btn" onClick={toggleSideBar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h4 className="logo-text">dashboard</h4>
                </div>
                <div className="btn-container">
                    <ThemeToggle/>
                    <LogOut/>
                </div>
            </div>

        </Wrapper>
    )
}
export default Navbar;
