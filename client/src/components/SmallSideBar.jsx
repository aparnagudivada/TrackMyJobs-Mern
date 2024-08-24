import Wrapper from "../assets/wrappers/SmallSidebar";
import   { useDashBoardContext }  from "../pages/DashboardLayout";
import Logo from './Logo';
import { FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";
const SmallSideBar=()=>{
   const {showSidebar,toggleSideBar}= useDashBoardContext();
    return (
        <Wrapper>
        <div className={showSidebar?"sidebar-container show-sidebar": 'sidebar-container'}>
            <div className="content">
                <button type='button' className="close-btn" onClick={toggleSideBar}>
                    <FaTimes/>
                </button>
                <header>
                    <Logo/>
                </header>
                <NavLinks/>
            </div>

        </div>
        </Wrapper>
    )

}
export default SmallSideBar;