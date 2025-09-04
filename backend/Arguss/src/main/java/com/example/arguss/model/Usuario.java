package com.example.arguss.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter @Setter //lombok anotation
@NoArgsConstructor @AllArgsConstructor

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//GERA AUTOMATICAMENTE OS IDS

    private int id;
    private String nome;
    private String email;
    private String senha;
}
