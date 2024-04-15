import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const AddContacts = () => {
   
    const [full_name, setName] = useState("")
    const [full_email, setEmail] = useState("")
    const [full_Address, setAddress] = useState("")
    const [full_phone, setPhone] = useState("")

    
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    const addNewContact = (e) => {
        e.preventDefault()
        actions.addNewContact({name: full_name,full_email,full_phone,full_Address})
        setName("")
        setAddress("")
        setEmail("")
        setPhone("")
    }
    const changePage = () => {
        navigate("/list");
    }
    return (
        
    <div class="container">
        <h1>add new contact</h1>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Full name</label>
            <input value={full_name} placeholder='Enter name' onChange={(e)=> setName(e.target.value)} type="name" class="form-control" id="exampleFormControlInput1"/>
        </div>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email</label>
            <input value={full_email} placeholder='Enter email' onChange={(e)=> setEmail(e.target.value)}type="email" class="form-control" id="exampleFormControlInput1"/>
        </div>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Phone</label>
            <input value={full_phone} placeholder='Enter phone' onChange={(e)=> setPhone(e.target.value)} type="phone" class="form-control" id="exampleFormControlInput1"/>
        </div>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Address</label>
            <input value={full_Address} placeholder='Enter Address' onChange={(e)=> setAddress(e.target.value)} type="address" class="form-control" id="exampleFormControlInput1"/>
        </div>
        
    

        <button onClick={addNewContact()}>Add contact</button>
        <button onClick={changePage}>Go back to list page</button>
     </div>
    )
}
