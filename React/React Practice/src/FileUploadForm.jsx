import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    file: yup
        .mixed()
        .required('A file is required')
        .test('fileSize', 'File too large', (value) => {
            return value && value[0] && value[0].size <= 2000000; // 2MB
        })
        .test('fileType', 'Unsupported File Format', (value) => {
            return value && value[0] && ['image/jpeg', 'image/png', 'application/pdf'].includes(value[0].type);
        }),
});

const FileUploadForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-4 font-semibold text-center">Upload File</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">File</label>
                    <input
                        type="file"
                        {...register('file')}
                        className={`w-full px-3 py-2 border rounded ${errors.file ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FileUploadForm;
