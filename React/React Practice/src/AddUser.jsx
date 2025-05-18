import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    contact_no: yup.string().matches(/^[0-9]{10}$/, 'Contact number must be 10 digits').required('Contact number is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    cnfPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    profile_pic: yup.mixed().required('Profile picture is required').test('fileSize', 'File too large', (value) => {
        return value && value[0] && value[0].size <= 2000000; // 2MB
    }).test('fileType', 'Unsupported file format', (value) => {
        return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
    role: yup.string().required('User role is required')
});

const AddUser = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        toast.success("Form Submitted")
        console.log(data);
        // try {
        //     await axios.post(`${APP_URL}/adduser`, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     toast.success('User added successfully');
        //     reset();
        //     // navigate('/users');
        // } catch (error) {
        //     toast.error('Failed to add user');
        //     console.error(error);
        // }
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <div className="px-4 py-3 page-body">
            <Toaster />
            <div className='card'>
                <div className="card-header py-3 bg-transparent border-bottom-0">
                    <h4 className="title-font mt-2 mb-0"><strong>Add User</strong></h4>
                </div>
                <div className="card-body card-main-one">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                        id="firstname"
                                        {...register('firstname')}
                                        placeholder="First Name"
                                    />
                                    <label htmlFor="firstname">First Name</label>
                                    {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                        id="lastname"
                                        {...register('lastname')}
                                        placeholder="Last Name"
                                    />
                                    <label htmlFor="lastname">Last Name</label>
                                    {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        {...register('email')}
                                        placeholder="Email"
                                    />
                                    <label htmlFor="email">Email</label>
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.contact_no ? 'is-invalid' : ''}`}
                                        id="contact_no"
                                        {...register('contact_no')}
                                        placeholder="Contact"
                                    />
                                    <label htmlFor="contact_no">Contact</label>
                                    {errors.contact_no && <div className="invalid-feedback">{errors.contact_no.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        {...register('password')}
                                        placeholder="Password"
                                    />
                                    <label htmlFor="password">Password</label>
                                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className={`form-control ${errors.cnfPassword ? 'is-invalid' : ''}`}
                                        id="cnfPassword"
                                        {...register('cnfPassword')}
                                        placeholder="Confirm Password"
                                    />
                                    <label htmlFor="cnfPassword">Confirm Password</label>
                                    {errors.cnfPassword && <div className="invalid-feedback">{errors.cnfPassword.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="file"
                                        className={`form-control ${errors.profile_pic ? 'is-invalid' : ''}`}
                                        id="profile_pic"
                                        {...register('profile_pic')}
                                        accept="image/*"
                                    />
                                    <label htmlFor="profile_pic">Profile Picture</label>
                                    {errors.profile_pic && <div className="invalid-feedback">{errors.profile_pic.message}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <select
                                        className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                        id="role"
                                        {...register('role')}
                                    >
                                        <option value="">Select a role</option>
                                        <option value="User">User</option>
                                        <option value="Vendor">Vendor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Master Administrator">Master Administrator</option>
                                    </select>
                                    <label htmlFor="role">User Role</label>
                                    {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="me-1 btn btn-primary" type="submit">Add User</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
