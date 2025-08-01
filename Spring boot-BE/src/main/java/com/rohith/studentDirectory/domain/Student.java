package com.rohith.studentDirectory.domain;

import lombok.*;
import java.lang.*;

import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    private Integer id;

    private Integer age;

    private String email;

    private String city;

    private String gender;

    private String major;

    private String name;

    private String phone;

}

