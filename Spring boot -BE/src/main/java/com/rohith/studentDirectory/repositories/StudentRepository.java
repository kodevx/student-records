package com.rohith.studentDirectory.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rohith.studentDirectory.entities.Student;


public interface StudentRepository extends CrudRepository<Student, Integer> {

    @Override
    public Optional<Student> findById(Integer id);

    public Iterable<Student> findByNameIgnoreCase(String name);
    public Iterable<Student> findByNameAndGenderAndCityAllIgnoreCase(String name, String gender, String city);
    public Iterable<Student> findByNameAndGenderAndMajorAllIgnoreCase(String name, String gender, String major);
    public Iterable<Student> findByNameAndCityAndMajorAllIgnoreCase(String name, String city, String major);
    public Iterable<Student> findByNameAndGenderAndCityAndMajorAllIgnoreCase(String name, String gender, String city, String major);

    
    public Iterable<Student> findByGenderIgnoreCase(String gender);
    public Iterable<Student> findByGenderAndCityAllIgnoreCase(String gender, String city);
    public Iterable<Student> findByGenderAndMajorAllIgnoreCase(String gender, String major);
    public Iterable<Student> findByGenderAndCityAndMajorAllIgnoreCase(String gender, String city, String major);

    
    public Iterable<Student> findByCityIgnoreCase(String city);
    public Iterable<Student> findByCityAndMajorAllIgnoreCase(String city, String major);

    @Query("SELECT s FROM Student s WHERE s.id = :id")
    public Iterable <Student> findStudentById(@Param("id") Integer id);
}
