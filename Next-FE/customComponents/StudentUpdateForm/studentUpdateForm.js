'use client';

import React from 'react';
import { Formik } from 'formik';

import Select from '@/components/Select';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';

import { GENDER_TYPES } from '@/constants/constants';

const StudentUpdateForm = (props) => {

    const { 
        initialValues,
        errorMessage,
        handleValidation,
        handleSubmitForm
    } = props;

    return (
        <div> 
            <Formik 
                initialValues={initialValues}
                validate={handleValidation}
            > 
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, resetForm }) => (
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(values);
                            handleSubmitForm(values);
                        }}
                        className={'grid grid-cols-3 gap-7'}
                    >
                        <TextInput 
                            name={'name'}
                            type={'name'}
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'N A M E*'}
                            error={
                                touched &&
                                touched.name &&
                                errors.name
                            }
                            classes={{
                                root: 'flex flex-col',
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none',
                                error: 'pt-3 text-red-500'
                            }}
                        />
                        <TextInput
                            name={'mobileNumber'}
                            type={'mobileNumber'}
                            value={values.mobileNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'M O B I L E  N U M B E R*'}
                            error={
                                touched &&
                                touched.mobileNumber &&
                                errors.mobileNumber
                            }
                            classes={{
                                root: 'flex flex-col',
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none',
                                error: 'pt-3 text-red-500'
                            }}
                        />
                        <TextInput 
                            name={'email'}
                            type={'email'}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'E M A I L*'}
                            error={
                                touched &&
                                touched.email &&
                                errors.email
                            }
                            classes={{
                                root: 'flex flex-col',
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none',
                                error: 'pt-3 text-red-500'
                            }}
                        />
                        <TextInput 
                            name={'city'}
                            type={'city'}
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'C I T Y*'}
                            error={
                                touched &&
                                touched.name &&
                                errors.city
                            }
                            classes={{
                                root: 'flex flex-col',
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none',
                                error: 'pt-3 text-red-500'
                            }}
                        />
                        <Select
                            name={'gender'}
                            type={'gender'}
                            value={values.gender}
                            options={GENDER_TYPES}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'G E N D E R*'}
                            error={
                                touched &&
                                touched.gender &&
                                errors.gender
                            }
                            classes={{
                                // root: 'flex flex-col',
                                root: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none text-black',
                                error: 'pt-3 text-red-500'
                            }}
                        />
                        <TextInput
                            name={'age'}
                            type={'age'}
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'A G E*'}
                            error={
                                touched &&
                                touched.age &&
                                errors.age
                            }
                            classes={{
                                root: 'flex flex-col',
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none',
                                error: 'pt-3 text-red-500'
                            }}
                        />
                        <TextInput 
                            name={'major'}
                            type={'major'}
                            value={values.major}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={'M A J O R*'}
                            error={
                                touched &&
                                touched.major &&
                                errors.major
                            }
                            classes={{
                                root: 'flex flex-col',
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none',
                                error: 'pt-1 text-red-500'
                            }}
                        />
                        <Button 
                            styles={'col-span-2 col-end-4 border-2 h-13 font-bold border-yellow-400 cursor-pointer hover:bg-yellow-400 hover:text-white focus:bg-yellow-500'} 
                            isDisabled={isSubmitting} 
                            type="submit"
                        >
                            S U B M I T
                        </Button>
                    </form>
                )}
            </Formik>
            <div className='py-2 text-red-500'>
                {errorMessage && errorMessage}
            </div>
        </div>
    )
}

export default StudentUpdateForm;
