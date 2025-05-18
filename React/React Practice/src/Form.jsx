import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    age: yup.number().positive().integer().required('Age is required'),
});

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4 font-semibold text-center">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        {...register('firstName')}
                        className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        {...register('lastName')}
                        className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        {...register('email')}
                        className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Age</label>
                    <input
                        type="number"
                        {...register('age')}
                        className={`w-full px-3 py-2 border rounded ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
