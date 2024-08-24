import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from './Logo';
import { useDashBoardContext } from "../pages/DashboardLayout";
const BigSideBar=()=>{
    const {showSidebar}= useDashBoardContext();
    return (
        <Wrapper>
        <div className={showSidebar?'sidebar-container':'sidebar-container show-sidebar'}>
            <div className="content">
                <header>
                    <Logo/>
                    </header>
                   <NavLinks isBigSideBar/> 
               
            </div>
        </div>
        </Wrapper>
    )

}
export default BigSideBar;