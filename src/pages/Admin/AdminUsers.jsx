import { Pencil, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Admin } from '../../services/admin'
import toast, { Toaster } from 'react-hot-toast'
import { useRef } from 'react'

const AdminUsers = () => {
    const navigate = useNavigate()
    const [addmodel, setAddmodel] = useState(false)
    const [deletemodel, setDeletemodel] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState(null)
    const [users, setUsers] = useState(null)
    const [role, setRole] = useState('User')

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const passwordRef = useRef(null)
    // const roleRef = useRef(null)
    const addressRef = useRef(null)

    const editUser = (uid) => {
        navigate(`/admin/plans/user/${uid}`)
    }
    const deleteUser = (uid) => {
        console.log(uid)
        setDeleteUserId(uid)
        setDeletemodel(true)
    }
    const addUser = async () => {
        try {
            await Admin.addUser(nameRef.current.value, emailRef.current.value, role, phoneRef.current.value, addressRef.current.value, passwordRef.current.value)
            toast.success('User Added !')
            setAddmodel(false)
            fetchUserData()
        } catch (error) {
            console.error("Error adding user:", error)
            toast.error(error);
        }
        // console.log(nameRef.current.value)

    }
    const confirmDeleteUser = async () => {
        try {
            await Admin.deleteUser(deleteUserId)
            setUsers(users.filter(user => user.uid !== deleteUserId))
            setDeletemodel(false)
            toast.success('User Deleted !')
        } catch (error) {
            console.error("Error deleting user:", error)
            toast.error(error);
        }
    }
    const fetchUserData = async () => {
        const res = await Admin.getAllUsersData()
        setUsers(res.filter(user => user.role !== 'Admin'));
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <>
            <div className='h-[90vh] flex justify-center items-center shadow-sm shadow-slate-100 w-[84vw]'>
                <div className='h-full w-5/6 flex justify-center items-start shadow-sm shadow-orange-500/30 '>
                    <table className='w-full h-auto border-2 border-orange-600 '>
                        <thead className='border-collapse border-2 border-orange-500 bg-orange-500 text-white'>
                            <tr>
                                <th>
                                    User ID
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Rank
                                </th>
                                <th>
                                    Score
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((user) => (
                                    <tr key={user.uid}>
                                        <td>
                                            {user.uid}
                                        </td>
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>
                                            {user.phone}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            #1
                                        </td>
                                        <td>
                                            2312
                                        </td>
                                        <td className='flex justify-center items-center gap-4'>
                                            <button onClick={() => editUser(user.uid)}> <Pencil className='text-blue-500 p-1 rounded-md border-2 border-blue-500 hover:bg-blue-500 hover:text-white' size={30} /> </button>
                                            <button onClick={() => deleteUser(user.uid)}> <Trash className='text-red-500 p-1 rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-white' size={30} /> </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <button className='text-green-500 p-1 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-white absolute right-4 bottom-4 flex flex-row justify-center items-center gap-1 font-semibold h-10 w-10' onClick={() => { setAddmodel(true) }}><Plus size={30} /></button>
            {
                deletemodel && (
                    <>
                        <div className='h-screen w-screen flex absolute z-50 bg-gray-500/60 justify-center items-center top-0 left-0'>
                            <div className='h-[45vh] w-[30vw] flex flex-col shadow-md shadow-orange-500/20 bg-white rounded-sm'>
                                <div className='h-5/6 w-full flex flex-col justify-center items-center p-2 gap-4'>

                                    Are you sure want to delete ?
                                </div>
                                <div className='h-1/6 w-full flex flex-row justify-center items-center'>
                                    <button className='w-1/2 h-full bg-red-500 font-bold text-white' onClick={() => { setDeletemodel(false) }}> Cancel </button>
                                    <button className='w-1/2 h-full bg-blue-500 font-bold text-white' onClick={confirmDeleteUser}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                addmodel && (
                    <>
                        <div className='h-screen w-screen flex absolute z-50 bg-gray-500/60 justify-center items-center top-0 left-0'>
                            <div className='h-[45vh] w-[30vw] flex flex-col shadow-md shadow-orange-500/20 bg-white rounded-sm'>
                                <div className='h-5/6 w-full flex flex-col justify-center items-center p-2 gap-4'>
                                    <input type='text' placeholder='Name' ref={nameRef} className='bg-orange-100/30 outline-none border-2 border-transparent focus:border-b-2 focus:border-b-orange-300 rounded-sm w-[80%] text-black placeholder:text-black p-2 shadow-sm' />
                                    <input type='email' placeholder='Email' ref={emailRef} className='bg-orange-100/30 outline-none border-2 border-transparent focus:border-b-2 focus:border-b-orange-300 rounded-sm w-[80%] text-black placeholder:text-black p-2 shadow-sm' />
                                    <input type='number' placeholder='Phone' ref={phoneRef} className='bg-orange-100/30 outline-none border-2 border-transparent focus:border-b-2 focus:border-b-orange-300 rounded-sm w-[80%] text-black placeholder:text-black p-2 shadow-sm' />
                                    <input type='password' placeholder='Password' ref={passwordRef} className='bg-orange-100/30 outline-none border-2 border-transparent focus:border-b-2 focus:border-b-orange-300 rounded-sm w-[80%] text-black placeholder:text-black p-2 shadow-sm' />
                                    <select value={role} onChange={(e) => setRole(e.target.value)} className='bg-orange-100/30 outline-none border-2 border-transparent focus:border-b-2 focus:border-b-orange-300 rounded-sm w-[80%] text-black placeholder:text-black p-2 shadow-sm'>
                                        <option value='User'>User</option>
                                        <option value='Admin'>Admin</option>
                                    </select>
                                    <input type='text' placeholder='Address' ref={addressRef} className='bg-orange-100/30 outline-none border-2 border-transparent focus:border-b-2 focus:border-b-orange-300 rounded-sm w-[80%] text-black placeholder:text-black p-2 shadow-sm' />
                                </div>
                                <div className='h-1/6 w-full flex flex-row justify-center items-center'>
                                    <button className='w-1/2 h-full bg-red-500 font-bold text-white' onClick={() => { setAddmodel(false) }}> Cancel </button>
                                    <button className='w-1/2 h-full bg-blue-500 font-bold text-white' onClick={addUser}>Add User</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <Toaster />
        </>
    )
}

export default AdminUsers