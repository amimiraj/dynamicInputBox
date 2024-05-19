'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {

  const router = useRouter();

  let [fields, setFields] = useState([{ num: '', status: false }]);
  const [numToAdd, setNumToAdd] = useState(1);
  const [sum, setSum] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);


  useEffect(() => {
    const activeIndices = [];
    const sumValues = fields.reduce((acc, field, index) => {
      if (field.status) {
        activeIndices.push(index + 1 + ' ');
        return acc + parseFloat(field.num || 0);
      }
      return acc;
    }, 0);
    setSum(sumValues);
    setActiveIndices(activeIndices);
  }, [fields]);



  const inputValue = (index, event) => {
    const newFields = [...fields];
    event.target.name == 'status' ? newFields[index][event.target.name] = event.target.checked : newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };


  const toggleSelect = () => {
    const allSelected = fields.every(field => field.status);
    const updatedFields = fields.map(field => ({ ...field, status: !allSelected }));
    setFields(updatedFields);
  };



  const addInputBox = () => {
    const numToAddInt = parseInt(numToAdd);
    if (!isNaN(numToAddInt) && numToAddInt > 0) {
      const newInputValues = [...fields];
      for (let i = 0; i < numToAddInt; i++) {
        newInputValues.push({ num: '', status: false })
      }

      setFields(newInputValues);
      setNumToAdd(1);
    }

  };



  const removeField = (index) => {
    const confirmDelete = window.confirm('Confirm ?');

    if (confirmDelete) {
      const newFields = [...fields];

      newFields.splice(index, 1);
      setFields(newFields);
    }
  };




  const submitTotalNum = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(fields),
      })

      if (response.ok) {
        localStorage.setItem("data", "Successfully added!");
        router.replace('/list');
      }

    } catch (error) {
      console.log(error)
    }
  };



  return (

    <>


      <div className="navbar-right bg-neutral text-neutral-content  flex justify-between">
        <div className="text-sm breadcrumbs ml-4">
          <ul>
            <li><Link href="/"> Home Page</Link></li>
          </ul>
        </div>

        <div className="text-sm breadcrumbs mr-4">
          <ul><li><Link href="/list"> List</Link></li></ul>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 ">
        <div className=' mt-20 mb-20  text-center'>
          <input type="text" placeholder="" className="input input-bordered input-neutral  W-[15%] mr-2" value={numToAdd} onChange={(event) => setNumToAdd(event.target.value)} />
          <button className="btn btn-neutral W-[5%]" onClick={addInputBox}>Add Textbox</button>
        </div>
      </div>


      <form onSubmit={submitTotalNum}>
        <div className='max-w-xl mx-auto'>

          {fields.map((field, index) => (
            <div key={index} className='mt-1 h-10 text-center'>
              <div className='join ml-16'>
                <input
                  type="checkbox"
                  name="status"
                  className="checkbox checkbox-neutral w-10 h-10 mr-1"
                  checked={field.status}
                  onChange={(e) => inputValue(index, e)}
                />
                <input
                  type="text"
                  required
                  name="num"
                  className="input input-bordered input-neutral w-[60%] h-10"
                  value={field.num}
                  onChange={(e) => inputValue(index, e)}
                />
                <button
                  type="button"
                  className="btn btn-sm hover:btn-error w-10 h-10 ml-1"
                  onClick={() => removeField(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}


          <div className='mt-2 text-center ml-3'>
            <button
              type="button"
              onClick={toggleSelect}
              className='btn w-[22%] mr-1 h-10'
            >
              {fields.every(field => field.status) ? 'Unselect All' : '  Select All'}
            </button>

            <input
              type="submit"
              name="create"
              className="btn btn-success w-[29%] h-10"
              value="Submit"
            />
          </div>
        </div>
      </form>

      <div className="card  bg-base-100 shadow-xl mt-10">
        <div className="card-body text-center ">
          {activeIndices.length > 0 && <p> <span > Output is: </span> Selected {fields.every(field => field.status) ? ' All ' + activeIndices.length + ' Iteams' : activeIndices.length + ' Iteams, there position is ' + activeIndices} and  Total Number is {sum}</p>}
        </div>
      </div>


    </>
  );
};

export default HomePage;
