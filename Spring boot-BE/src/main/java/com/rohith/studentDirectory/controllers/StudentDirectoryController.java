package com.rohith.studentDirectory.controllers;

import com.rohith.studentDirectory.dao.impl.StudentDaoImpl;
import com.rohith.studentDirectory.domain.Student;

import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")

public class StudentDirectoryController {

    private final StudentDaoImpl studentDaoImpl;

    public StudentDirectoryController(StudentDaoImpl studentDaoImpl) {
       this.studentDaoImpl = studentDaoImpl;
    }

    @GetMapping("/")
    public List<Student> getAllStudentRecords () {
        return studentDaoImpl.readAll();
    }

    @PostMapping("/add")
    public List<Student> addStudentRecord(@RequestBody Student student) {
        return studentDaoImpl.create(student);
    }

    @PutMapping("/update/{id}")
    public List<Student> updateStudentRecordById(
        @RequestParam("id") Integer id,
        @RequestParam("name") String name,
        @RequestParam("age") Integer age,
        @RequestParam("major") String major,
        @RequestParam("phone") String phone,
        @RequestParam("email") String email,
        @RequestParam("city") String city,
        @RequestParam("gender") String gender
    ) {
        Student student = new Student(id, age, email, city, gender, major, name, phone);
        return studentDaoImpl.update(id, student);
    }

    @DeleteMapping("/remove/{id}")
    public Boolean deleteStudentRecord(
            @PathVariable Integer id
    ){
        return studentDaoImpl.remove(id);
    }

    @GetMapping("/search")
    public List<Student> searchStudentRecords(
            @RequestParam(value = "id", required = false) Integer id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "major", required = false) String major,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "gender", required = false) String gender
    ){
       List<Student> studentDetails = studentDaoImpl.search(id, name, major, city, gender);

       return studentDetails;
    }
}
