'use client';

import React from "react";
import Link from "next/link";
import AddIcon from "@/assets/icons/addIcon.png";
import MinimizeIcon from "@/assets/icons/minimizeIcon.png";
import SearchIcon from "@/assets/icons/searchIcon.png";

import ActionButton from '@/customComponents/ActionButton';
import StudentTable from "@/components/StudentTable";
import StudentForm from "@/customComponents/StudentForm";

import useHome from '@/customHooks/Home/useHome';

export default function Home() {

  const { 
        students,
        isShowStudentForm,
        handleStudentForm,
        handleDeleteStudent
  } = useHome();

  console.log("students: ",students);

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center pt-4">
        <h4 className="flex font-bold py-5">
          <pre>
            S T U D E N T  L I S T
          </pre>
        </h4>
        <StudentTable 
          data={students}  
          isShowActionsColumn
          emptyRowLabel={'No Records found...'}
          handleDeleteStudent={handleDeleteStudent}
        />
      </div>
      <div className="flex flex-col justify-between px-40 py-10">
        <div className="flex flex-row justify-between">
          <ActionButton
            imageSrc={isShowStudentForm ? MinimizeIcon : AddIcon}
            styles={'cursor-pointer flex flex-row justify-content-start items-center pt-5'}
            handleClick={handleStudentForm}
          >
            {'A D D  S T U D E N T'}
          </ActionButton>
          <ActionButton
            imageSrc={SearchIcon}
            styles={'cursor-pointer flex flex-row justify-content-start items-center pt-5'}
            handleClick={() => null}
          >            
            <Link href={`/search`} className="flex flex-col">
              {'S E A R C H   S T U D E N T   D E T A I L S'}
            </Link>
          </ActionButton>
        </div>
        <div className="py-20">
          {isShowStudentForm ? <StudentForm /> : null}
        </div>
      </div>
    </React.Fragment>
  );
}
