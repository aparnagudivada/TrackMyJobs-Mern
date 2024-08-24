
import   { useDashBoardContext }  from "../pages/DashboardLayout";

import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks =({isBigSideBar
})=>{
    const {toggleSideBar,user}= useDashBoardContext();

    return (
        <div className="nav-links">
                    {links.map((link)=>{
                        const  {text,path,icon}=link;
                        const {role}=user
                        if(path === 'admin' && role!=='admin') return;
                        return <NavLink to={path} key={text} className='nav-link' onClick={isBigSideBar? null:toggleSideBar} end>
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    })}

                </div>
    )
}
export default NavLinks;