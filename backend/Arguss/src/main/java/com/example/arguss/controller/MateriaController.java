package com.example.arguss.controller;

import com.example.arguss.model.Materia;
import com.example.arguss.service.MateriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor

//endpoint
@RequestMapping("/materias")

public class MateriaController {

    @Autowired
    private MateriaService materiaService;



    @GetMapping("/{id}")
    public ResponseEntity<Materia> getById(@PathVariable Long id) {
        return materiaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Get lista
    @GetMapping
    public ResponseEntity<List<Materia>> listar() {
        List<Materia> lista = materiaService.listarMaterias();
        System.out.println("Retornando lista de materias");
        return ResponseEntity.ok(lista);
    }

    //post
    @PostMapping
    public ResponseEntity<Materia> criar(
            @Valid @RequestBody Materia materia,
            UriComponentsBuilder uriBuilder) {

        Materia criada = materiaService.saveMateria(materia);
        URI uri = uriBuilder
                .path("/api/materias/{id}")
                .buildAndExpand(criada.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(criada);
    }
    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        return materiaService.getMateria(id)
                .map(existing ->{
                    materiaService.deleteMateria(id);
                    System.out.println("Delete feito!");
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //put
    //@PutMapping

}