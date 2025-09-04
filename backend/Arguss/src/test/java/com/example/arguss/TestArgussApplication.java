package com.example.arguss;

import org.springframework.boot.SpringApplication;

public class TestArgussApplication {

    public static void main(String[] args) {
        SpringApplication.from(ArgussApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
