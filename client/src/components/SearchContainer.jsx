import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, useNavigate } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';
import { useRef } from 'react';


const SearchContainer = () => {
    const {searchValues}=useAllJobsContext();
    const{search,jobStatus,jobType,sort }= searchValues;
    const submit= useSubmit();
    const navigate=useNavigate();
    const formRef= useRef(null);
    const debounce = (onChange) => {
        let timeout;
        return (e) => {
          const form = e.currentTarget.form;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            onChange(form);
          }, 2000);
        };
      };
      const handleReset=(e)=>{
        e.preventDefault();
        if(formRef.current){
            formRef.current.reset();
            submit(formRef.current);
        
        navigate('/dashboard/all-jobs');
      }
    }
  return (
    <Wrapper>
      <Form className='form' ref={formRef}>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow type='search' name='search' defaultValue={search}  onChange={debounce((form) => {
    submit(form);
  })}/>
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus} onChange={(e)=>
                submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e)=>
                submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e)=>
                submit(e.currentTarget.form)}
          />

          <button type='button' className='btn form-btn delete-btn' onClick={handleReset}>
            Reset Search Values
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;