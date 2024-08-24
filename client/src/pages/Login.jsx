import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo,SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useActionData } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    //toast.error(error?.response?.data?.msg);
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};
const Login=()=>{
   const navigate=useNavigate();
   const loginDemoUser =async ()=>{
    const data ={
        email:'test@test.com',
        password:'secret123'

    }
    try{
        await customFetch.post('/auth/login', data);
    toast.success('Take a test drive');
    navigate('/dashboard');
    }
    catch(error)
    {
        toast.error(error?.response?.data?.msg);
    }
   }
    const errors = useActionData();
  
    return (
        <Wrapper>
             <Form method='post' className='form'>
     <Logo/>
     <h4>Login</h4>
     {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
     <FormRow type='email' name='email' />
            <FormRow type='password' name='password' />
            <SubmitBtn formBtn/>
            <button type='submit' className='btn btn-block' onClick={loginDemoUser}>Explore The App</button> 
            <p>Not a Member yet? 
            <Link to='/register' style={{ color: 'red' }}>Register</Link>
            </p>  
     </Form>
    </Wrapper>
    );
}
export default Login;