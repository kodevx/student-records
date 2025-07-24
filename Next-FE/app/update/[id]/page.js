'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import StudentUpdateForm from '@/customComponents/StudentUpdateForm';
import useUpdatePage from '@/customHooks/UpdatePage/useUpdatePage';
import StudentTable from '@/components/StudentTable';

const UpdatePage = (props) => {

    const { id } = useParams();

    const { 
        isDetailsUpdated,
        updateStatus,
        studentToUpdate,
        errorMessage,
        handleSubmitForm,
        initialValues,
        handleValidation
    } = useUpdatePage({ 
        id: parseInt(id) 
    });

    return (
        <div className='flex flex-col px-30 pt-10'>
            <div className={'font-bold pb-5 self-center'}>
                <pre>
                    U P D A T E   S T U D E N T   D E T A I L S
                </pre>
            </div>
            <StudentUpdateForm 
                initialValues={initialValues}
                errorMessage={errorMessage}
                handleValidation={handleValidation}
                handleSubmitForm={handleSubmitForm}
            />
            {updateStatus ? (
                <div className='font-bold flex self-center pb-5 text-red-500'>
                    {updateStatus.toUpperCase()}
                </div>
            ) : null}
            {isDetailsUpdated ? (
                <div className='flex justify-center mt-7'>
                    <StudentTable data={studentToUpdate} isShowActionColumn={false} />
                </div>
            ) : null}
        </div>
    )
}

export default UpdatePage;
