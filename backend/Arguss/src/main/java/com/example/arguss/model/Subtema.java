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
@Table(name = "subtemas")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Subtema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @ManyToOne
    @JoinColumn(name = "tema_id")
    @JsonBackReference

    private Tema tema; // Relaciona o subtema a um tema
    @OneToMany(mappedBy = "subtema", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Conteudo> conteudos;
}
