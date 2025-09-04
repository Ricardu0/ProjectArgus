package com.example.arguss.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "temas")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor


public class Tema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Ensino ensino;

    @ManyToOne
    @JoinColumn(name = "materia_id")
    @JsonBackReference
    private Materia materia;

    // Nova relação com Subtema (filhos)
    @OneToMany(mappedBy = "tema", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Subtema> subtema;


}
