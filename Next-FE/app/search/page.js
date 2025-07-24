'use client';

import Image from 'next/image';
import searchIcon from '@/assets/icons/searchIcon.png'

import StudentTable from '@/components/StudentTable';
import SearchForm from '@/customComponents/SearchForm';

import useSearchPage from '@/customHooks/SearchPage/useSearchPage';

const SearchPage = (props) => {

    const { 
        studentData,
        errorMessage,
        handleSubmitForm,
        initialValues,
        handleValidation 
    } = useSearchPage();

    return (
        <div className='flex flex-col mt-15'>
            <div className='flex flex-row mb-9 self-center'>
                <Image 
                    src={searchIcon}
                    width={30}
                    height={30}
                    alt={'action-button-image'}
                />
                <div className="pl-2 font-bold">
                    <pre>
                        {'S E A R C H   S T U D E N T   D E T A I L S'}
                    </pre>
                </div>
            </div>
            <div className='mx-40'>
                <SearchForm 
                    initialValues={initialValues}
                    errorMessage={errorMessage}
                    handleSubmitForm={handleSubmitForm}
                    handleValidation={handleValidation}
                />
            </div>
            <div className='mt-10 self-center'>
                <StudentTable
                  data={studentData} 
                  isShowActionColumn={false}
                  emptyRowLabel={'No search results yet ...'}
                />
            </div>
        </div>
    )
}

export default SearchPage;
