package com.rohith.studentDirectory.controllers;

import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.rohith.studentDirectory.entities.Student;
import com.rohith.studentDirectory.repositories.StudentRepository;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentDirectoryController {

    private final StudentRepository studentRepository;

    public StudentDirectoryController (StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/")
    public Iterable<Student> getAllStudentDetails() {
        return this.studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable("id") Integer id) {
        Optional<Student> studentOfIdOptional = this.studentRepository.findById(id);

        if(!studentOfIdOptional.isPresent()) {
            return null;
        } else {
            Student studentOfId = studentOfIdOptional.get();
            return studentOfId;
        }
    }

    @PostMapping("/add")
    public Iterable<Student> addStudentDetails(@RequestBody Student newStudent){
        System.out.println(newStudent);
        this.studentRepository.save(newStudent);

        return this.studentRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public Iterable<Student> updateStudentDetails(
        @PathVariable Integer id,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String email,
        @RequestParam(required = false) String phone,
        @RequestParam(required = false) String city,
        @RequestParam(required = false) String major,
        @RequestParam(required = false) String gender,
        @RequestParam(required = false) Integer age
    ) {
        Optional<Student> studentToUpdateOptional = this.studentRepository.findById(id);

        if(!studentToUpdateOptional.isPresent()) {
            return null;
        } else {
            Student studentToUpdate = studentToUpdateOptional.get();

            if(Objects.nonNull(name)) {
                studentToUpdate.setName(name);
            }
            if(Objects.nonNull(email)) {
                studentToUpdate.setEmail(email);
            }
            if(Objects.nonNull(phone)) {
                studentToUpdate.setPhone(phone);
            }
            if(Objects.nonNull(city)) {
                studentToUpdate.setCity(city);
            }
            if(Objects.nonNull(major)) {
                studentToUpdate.setMajor(major);
            }
            if(Objects.nonNull(gender)) {
                studentToUpdate.setGender(gender);
            }
            if(Objects.nonNull(age)) {
                studentToUpdate.setAge(age);
            }

            this.studentRepository.save(studentToUpdate);

            return this.studentRepository.findAll();
        }
    }
    
    @DeleteMapping("/remove/{id}")
    public Student removeStudentDetails(@PathVariable Integer id){
        Optional<Student> studentToDeleteOptional = this.studentRepository.findById(id);

        if(!studentToDeleteOptional.isPresent()) {
            return null;
        } else {
            Student studentToDelete = studentToDeleteOptional.get();
            this.studentRepository.delete(studentToDelete);

            return studentToDelete;
        }
    }

    @GetMapping("/search")
    public Iterable<Student> searchStudentDetails(
        @RequestParam(required = false) Integer id,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String gender,
        @RequestParam(required = false) String major,
        @RequestParam(required = false) String city
    ) {
        if(
            Objects.nonNull(name) ||
            Objects.nonNull(gender) ||
            Objects.nonNull(city) ||
            Objects.nonNull(major)
        ) {

            if(Objects.nonNull(name)) {

                if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ){
                    return studentRepository.findByNameAndGenderAndCityAndMajorAllIgnoreCase(name, gender, city, major);
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(city)
                ) {
                    return studentRepository.findByNameAndGenderAndCityAllIgnoreCase(name, gender, city);
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(major)
                ) {
                    return studentRepository.findByNameAndGenderAndMajorAllIgnoreCase(name, gender, major);
                } else if (
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ) {
                    return studentRepository.findByNameAndCityAndMajorAllIgnoreCase(name, city, major);
                } else {
                    return studentRepository.findByNameIgnoreCase(name);
                }
            } else if(Objects.nonNull(gender)) {

                if(
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ){
                    return studentRepository.findByGenderAndCityAndMajorAllIgnoreCase(gender, city, major);
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(city)
                ) {
                    return studentRepository.findByGenderAndCityAllIgnoreCase(gender, city);
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(major)
                ) {
                    return studentRepository.findByGenderAndMajorAllIgnoreCase(gender, major);
                } else {
                    return studentRepository.findByGenderIgnoreCase(gender);
                }

            } else if(Objects.nonNull(city)) {
                if(
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ){
                    return studentRepository.findByCityAndMajorAllIgnoreCase(city, major);
                } else {
                    return studentRepository.findByCityIgnoreCase(city);
                }
            } else {
                return null;
            }
        } else if (Objects.nonNull(id)) {
            return studentRepository.findStudentById(id);
        } else {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "At least (one or more) filter are required for student details"
            );
        }
    }

}
