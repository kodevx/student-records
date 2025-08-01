package com.rohith.studentDirectory.dao;

import com.rohith.studentDirectory.domain.Student;

import java.util.List;
import java.util.Optional;

public interface StudentDao {

    public List<Student> create(Student student);

    public List<Student> readAll();

    public Boolean remove(Integer id);

    public List<Student> update(Integer id, Student student);

    public List<Student> search(Integer id, String name, String major, String city, String gender);
}
