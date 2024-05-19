'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2'

const dataList = () => {


    const [data, setData] = useState([]);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    let serial = 1;


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const fetchData = await response.json();
                setData(fetchData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [deleteTrigger]);


    useEffect(() => {
        if (localStorage.getItem("data")) {
            Swal.fire({
                title: localStorage.getItem("data"),
                showConfirmButton: false,
                icon: "success",
                timer: 1500
            });
            localStorage.removeItem("data");
        }
    }, []);


    const dataDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/list?id=${id}`, {
                        method: 'DELETE',
                    })

                    if (response.ok) {
                        setDeleteTrigger(prevTrigger => !prevTrigger);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 1000
                        });

                    }

                } catch (error) {
                    console.log(error)
                }

            }
        });

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
                    <ul><li><Link href="/"> Add</Link></li></ul>
                </div>
            </div>

            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 ">
                <p className="text-4xl text-success dark:text-gray-500  ">
                </p>
            </div>


            <div className="overflow-x-auto">

                <table className="table">
                    <thead>
                        <tr className='bg-slate-300 font-extrabold text-xl'>
                            <th>Serial</th>
                            <th className='text-center'>All Numbers </th>
                            <th className='text-center'>Total </th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {data.map(data => (

                            <tr key={data.id} className='hover:bg-blue-100'>

                                <th className=''>{serial++}</th>
                                <td className='text-center p-0'>{data.numbers}</td>
                                <td className='text-center p-0 w-64'>{data.total}</td>

                                <td className='text-center  p-0'>
                                    <button className="btn btn-square btn-outline btn-primary hover:btn-primary mr-1 btn-sm w-14" >
                                        <Link href={`/edit/${data.id}`}>Edit</Link>
                                    </button>
                                    <button className="btn btn-square btn-outline  btn-error  hover:bg-red-500 btn-sm w-14" onClick={() => dataDelete(data.id)}>
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>






        </>

    );
};

export default dataList;
