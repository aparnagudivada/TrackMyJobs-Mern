
import Wrapper from "../assets/wrappers/LandingPage";
import main from '../assets/images/main.svg';
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
    return (
      <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            <div className="info">
            <h1>job <span>tracking</span> app</h1>
            <p>
            TrackMyJobs revolutionizes your job search by offering a streamlined platform to track and manage your job applications. Effortlessly organize your progress and stay on top of every opportunity with powerful tracking tools.
            </p>
            <Link to='/register' className='btn register-link'>Register</Link>
            <Link to='/login' className='btn'>Login / Demo User</Link>
        </div>
        <img src={main} alt='job hunt' className="img main-img"></img>
        </div>
      </Wrapper>
    );
  };

export default Landing;