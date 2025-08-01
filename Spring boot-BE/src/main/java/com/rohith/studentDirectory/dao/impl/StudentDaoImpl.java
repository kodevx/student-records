package com.rohith.studentDirectory.dao.impl;

import com.rohith.studentDirectory.dao.StudentDao;
import com.rohith.studentDirectory.domain.Student;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class StudentDaoImpl implements StudentDao {

    private final JdbcTemplate jdbcTemplate;

    public StudentDaoImpl(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Student> readAll() {
        List<Student> results = jdbcTemplate.query(
                "SELECT * FROM students",
                new StudentRowMapper()
        );

        return results;
    }

    @Override
    public List<Student> create(Student student) {
        int resultStatus = jdbcTemplate.update(
                "INSERT INTO students (age, city, email, gender, major, name, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
                student.getAge(), student.getCity(), student.getEmail(), student.getGender(), student.getMajor(), student.getName(), student.getPhone()
        );

        if(resultStatus == 1) {
            List<Student> allStudents = jdbcTemplate.query(
                    "SELECT * FROM students",
                    new StudentRowMapper()
            );
            System.out.println("all Student: "+allStudents);
            return allStudents;
        } else {
            return null;
        }
    }

    @Override
    public Boolean remove(Integer id) {
         int resultStatus = jdbcTemplate.update(
                "DELETE FROM students WHERE id = ?",
                id
         );

        return resultStatus == 1;
    }

    public List<Student> update(
            Integer id,
            Student student
    ) {
        jdbcTemplate.update(
                "UPDATE students SET age = ?, email = ?, city = ?, gender = ?, major = ?, name = ?, phone = ? WHERE id = ?",
                student.getAge(),
                student.getEmail(),
                student.getCity(),
                student.getGender(),
                student.getMajor(),
                student.getName(),
                student.getPhone(),
                student.getId()
        );

        List<Student> studentList = jdbcTemplate.query(
                "SELECT * FROM students",
                new StudentRowMapper()
        );

        System.out.println("Student: " + studentList);
        return studentList;
    }

    public List<Student> search(
            Integer id,
            String name,
            String major,
            String city,
            String gender
    ){
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
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(name = ?), UPPER(gender = ?), UPPER(city = ?), UPPER(major = ?)",
                            new StudentRowMapper(),
                            name.toUpperCase(),
                            gender.toUpperCase(),
                            city.toUpperCase(),
                            major.toUpperCase()
                    );

                    return student;
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(city)
                ) {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(name) = UPPER(?), UPPER(gender) = UPPER(?), UPPER(city) = UPPER(?)",
                            new StudentRowMapper(),
                            name,
                            gender,
                            city
                    );

                    return student;
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(major)
                ) {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(name) = UPPER(?), UPPER(gender) = UPPER(?), UPPER(major) = UPPER(?)",
                            new StudentRowMapper(),
                            name,
                            gender,
                            major
                    );

                    return student;
                } else if (
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ) {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(name) = UPPER(?), UPPER(city) = UPPER(?), UPPER(major) = UPPER(?)",
                            new StudentRowMapper(),
                            name,
                            city,
                            major
                    );

                    return student;
                } else {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(name) = UPPER(?)",
                            new StudentRowMapper(),
                            name
                    );

                    return student;
                }
            } else if(Objects.nonNull(gender)) {
                if(
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ){
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(gender) = UPPER(?), UPPER(city) = UPPER(?), UPPER(major) = UPPER(?)",
                            new StudentRowMapper(),
                            gender,
                            city,
                            major
                    );

                    return student;
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(city)
                ) {

                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(gender) = UPPER(?), UPPER(city) = UPPER(?)",
                            new StudentRowMapper(),
                            gender,
                            city
                    );

                    return student;
                } else if(
                    Objects.nonNull(gender) &&
                    Objects.nonNull(major)
                ) {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(gender) = UPPER(?), UPPER(major) = UPPER(?)",
                            new StudentRowMapper(),
                            gender,
                            major
                    );

                    return student;
                } else {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(gender) = UPPER(?)",
                            new StudentRowMapper(),
                            gender
                    );

                    return student;
                }

            } else if(Objects.nonNull(city)) {
                if(
                    Objects.nonNull(city) &&
                    Objects.nonNull(major)
                ){
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(city) = UPPER(?), UPPER(major) = UPPER(?)",
                            new StudentRowMapper(),
                            city,
                            major
                    );

                    return student;
                } else {
                    List<Student> student = jdbcTemplate.query(
                            "SELECT * FROM students WHERE UPPER(city) = UPPER(?)",
                            new StudentRowMapper(),
                            city
                    );

                    return student;
                }
            } else {
                return null;
            }
        }
        else if (Objects.nonNull(id)) {
            List<Student> student = jdbcTemplate.query(
                    "SELECT * FROM students WHERE id = ?",
                    new StudentRowMapper(),
                    id
            );

            return student;
        }
        else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "At least (one or more) filter are required for student details"
            );
        }
}

    public static class StudentRowMapper implements RowMapper<Student> {

        @Override
        public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
            return Student
                    .builder()
                    .id(rs.getInt("id"))
                    .age(rs.getInt("age"))
                    .name(rs.getString("name"))
                    .phone(rs.getString("phone"))
                    .email(rs.getString("email"))
                    .major(rs.getString("major"))
                    .gender(rs.getString("gender"))
                    .city(rs.getString("city"))
                    .build();
        }
    }
}
