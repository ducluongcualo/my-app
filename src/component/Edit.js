import React, { useState, useEffect } from 'react'
import './Add.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Form, FormGroup, Button, Input } from 'reactstrap'
import axios from 'axios'
import productApi from '../api/productApi'

export default function Edit() {

    const [formErrors, setFormErrors] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();
    const initialValues = { id: "", name: "", email: "", gender: "", status: "" }
    const [formValues, setFormValues] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
        setIsSubmit(true)
    }

    useEffect(() => {
        let data = localStorage.getItem("item")
        setFormValues(JSON.parse(data));

    }, [])

    const handleUpdate = (e) => {
        let id = formValues.id
        console.log(id)
        e.preventDefault()
        let errors = validate(formValues);
        if (errors) {
            console.log(errors)
            setFormErrors(errors);
            return
        } else {
            try {
                productApi.put(id, formValues)
                    .then((res) => {
                        history.push('/')
                    })
            }
            catch (errors) {
                console.log("Errors", errors)
            }
        }
    }
    const handleRadio = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
        setIsSubmit(true)

    }
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Name is required"
        } else if (values.name.length < 6) {
            errors.name = " Minimum length is 6 characters"
        }
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format"
        }
        if (!values.gender) {
            errors.gender = "Gender is required"
        }
        if (!values.status) {
            errors.status = "Status is required"
        }
        return Object.keys(errors).length > 0 ? errors : null
    }
    return (
        <div>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Register Today</h3>
                                <p>Fill in the data below.</p>

                                <Form className="requires-validation" noValidate onSubmit={handleUpdate} >
                                    <FormGroup className="col-md-12">
                                        <Input className="form-control" onChange={handleChange} value={formValues.name} type="text" name="name" placeholder=" Name" required />
                                        {formErrors && <p className="errors">{formErrors.name}</p>}
                                    </FormGroup>
                                    <FormGroup className="col-md-12">
                                        <Input className="form-control disabled-input" disabled value={formValues.email} type="email" name="email" placeholder="E-mail " required />
                                        {formErrors && <p className="errors">{formErrors.email}</p>}

                                    </FormGroup>
                                    <FormGroup className="col-md-12 mt-3">
                                        <label className="mb-3 mr-1" htmlFor="gender">Gender: </label>
                                        <input type="radio" className="btn-check" value="male" onChange={handleRadio} name="gender" checked={formValues.gender === "male"} id="male" autoComplete="off" required />
                                        <label className="btn btn-sm btn-outline-secondary" htmlFor="male">Male</label>
                                        <input type="radio" className="btn-check" value="female" onChange={handleRadio} name="gender" checked={formValues.gender === "female"} id="female" autoComplete="off" required />
                                        <label className="btn btn-sm btn-outline-secondary" htmlFor="female">Female</label>
                                        {formErrors && <p className="errors">{formErrors.gender}</p>}

                                    </FormGroup>
                                    <FormGroup className="col-md-12">
                                        <select className="form-select mt-3" onChange={handleChange} value={formValues.status} name="status" required>
                                            <option selected disabled value>Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {formErrors && <p className="errors">{formErrors.status}</p>}

                                    </FormGroup>
                                    <FormGroup className="form-button mt-3">
                                        <Button id="submit" type="submit" className="btn btn-primary">Update</Button>
                                        <Link to='/' id="submit" type="submit" className="cancel btn btn-primary">Cancel</Link>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
