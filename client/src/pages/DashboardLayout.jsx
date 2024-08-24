import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, NavBar, SmallSideBar } from "../components";
import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = async () => {
    try {
      const { data } = await customFetch('/users/current-user');
      return data;
    } catch (error) {
      return redirect('/');
    }
  };
  

const DashBoardContext= createContext();
const DashboardLayout = ({ isDarkThemeEnabled }) => {
    const navigate = useNavigate();
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
    const {user} = useLoaderData();
    const [showSidebar,setShowSidebar]=useState(false);
  

    const toggleDarkTheme= ()=>{
        const newTheme=!isDarkTheme;
        setIsDarkTheme(newTheme);
        document.body.classList.toggle('dark-theme',newTheme);
        localStorage.setItem('darkTheme',newTheme);
    } 
    const toggleSideBar =()=>{
        setShowSidebar(!showSidebar);
    }
    const logoutUser = async () => {
        navigate('/');
        await customFetch.get('/auth/logout');
        toast.success('Logging out...');
      };
    return (
        <DashBoardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSideBar,logoutUser}}>
        <Wrapper>
        <main className="dashboard">

            <SmallSideBar/>
            <BigSideBar/>
            <div>
                <NavBar/>
            <div className="dashboard-page">
                <Outlet context={{user}}/>
            </div>
            </div>
        </main>
        </Wrapper>
        </DashBoardContext.Provider>
    )
}
export const useDashBoardContext = ()=>useContext(DashBoardContext);

export default DashboardLayout;