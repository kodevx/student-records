'use client';

import React from 'react';
import { Formik } from 'formik';

import Select from '@/components/Select';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';

import { GENDER_TYPES } from '@/constants/constants';

const SearchForm = props => {

    const {
        errorMessage,
        initialValues,
        handleSubmitForm,
        handleValidation 
    } = props;

    return (
        <div>
            <Formik 
                initialValues={initialValues}
                // validate={handleValidation}
            > 
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting, resetForm }) => (
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(values);
                            handleSubmitForm(values);
                            resetForm();
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
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none bg-white',
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
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none bg-white',
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
                                root: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none text-gray-300',
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
                                input: 'p-3 bg-white border-2 border-yellow-400 border-solid outline-none bg-white',
                                error: 'pt-1 text-red-500'
                            }}
                        />
                        <Button 
                            styles={'col-span-2 span-end-3 border-2 h-13 font-bold border-yellow-400 cursor-pointer hover:bg-yellow-400 hover:text-white focus:bg-yellow-500'} 
                            isDisabled={isSubmitting} 
                            type="submit"
                        >
                            S U B M I T
                        </Button>
                    </form>
                )}
            </Formik>
            <div className='flex justify-center text-red-500 py-5 font-bold'>
                {errorMessage && errorMessage.toUpperCase()}
            </div>
        </div>
    )
}

export default SearchForm;
