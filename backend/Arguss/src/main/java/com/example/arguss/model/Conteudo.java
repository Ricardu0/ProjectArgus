package com.example.arguss.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conteudos")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Conteudo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String texto; // Explicação do conteúdo

    private String linkReferencia; // Link para material externo

    @ManyToOne
    @JoinColumn(name ="subtema_id")
    @JsonBackReference
    private Subtema subtema; // Relaciona o conteúdo a um subtema

    // --------------------------------------------------
    // Getter adicional para expor subtemaId no JSON
    // --------------------------------------------------
    @JsonProperty("subtemaId")
    public Long getSubtemaId() {
        return subtema != null ? subtema.getId() : null;
    }
    // --------------------------------------------------
}
