'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

import RemoveIcon from '@/assets/icons/removeIcon.png';
import UpdateIcon from '@/assets/icons/updateIcon.png';

const StudentTable = props => {

    const { 
        data,
        emptyRowLabel,
        isShowActionsColumn,
        handleDeleteStudent
    } = props;

    console.log("student table data: ",data)

    const rowElements = 
        data && 
        data.map(data => (
            <tbody key={data.id}>
                <tr className='border-b-2 border-amber-500'>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {`${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}`}
                        </div>
                    </td>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {data.phone}
                        </div>
                    </td>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {data.email}
                        </div>
                    </td>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {data.city}
                        </div>
                    </td>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {data.gender}
                        </div>
                    </td>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {data.age}
                        </div>
                    </td>
                    <td className='h-15 w-40'>
                        <div className='d-flex justify-self-center'>
                            {data.major}
                        </div>
                    </td>
                    {isShowActionsColumn ? (
                        <td className='h-15 w-40 flex flex-row justify-around items-center px-5'>
                            {handleDeleteStudent ? (
                                <Button
                                    styles={'cursor-pointer'}
                                    handleClick={() => handleDeleteStudent(data.id)}
                                    isDisabled={false}
                                >
                                    <Image 
                                        src={RemoveIcon}
                                        width={30}
                                        height={30}
                                        alt={'header-image'}
                                    />
                                </Button>
                            ) : null}
                            <Button
                                onClick={() => null}
                                styles={'cursor-pointer'}
                                handleClick={() => null}
                                isDisabled={false}
                            >
                                <Link href={`/update/${data.id}`}>
                                    <Image 
                                        src={UpdateIcon}
                                        width={30}
                                        height={30}
                                        alt={'header-image'}
                                    />
                                </Link>
                            </Button>
                        </td>
                    ) : null}
                </tr> 
            </tbody>
        ));

    return (
        <div>
            <table className='border-2 border-amber-500'>
                <thead>
                    <tr className='border-2 border-amber-500'>
                        <th className='h-10 w-30'>Name</th>
                        <th className='h-10 w-30'>Phone</th>
                        <th className='h-10 w-30'>Email</th>
                        <th className='h-10 w-30'>City</th>
                        <th className='h-10 w-30'>Gender</th>
                        <th className='h-10 w-30'>Age</th>
                        <th className='h-10 w-30'>Major</th>
                        {isShowActionsColumn ? <th className='h-10 w-30'>Actions</th> : null}
                    </tr>
                </thead>
                {rowElements}
            </table>
            {rowElements && rowElements.length === 0 ? (
                <div className='flex justify-center items-center border-x-2 border-b-2 h-20 w-auto border-amber-500 text-lg font-bold text-amber-500'>
                    {emptyRowLabel}
                </div>
            ) : null}
        </div>
    )
}

StudentTable.defaultProps = {
    rowData: [],
    isShowActionsColumn: true
}

export default StudentTable;
