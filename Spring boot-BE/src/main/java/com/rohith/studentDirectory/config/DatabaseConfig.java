package com.rohith.studentDirectory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    public JdbcTemplate jdbcTemplate(final DataSource dataSource) {
        return jdbcTemplate(dataSource);
    }

}