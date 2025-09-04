package com.example.arguss.controller;

import com.example.arguss.model.Tema;
import com.example.arguss.model.Usuario;
import com.example.arguss.service.TemaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/temas")
public class TemaController {
    private final TemaService temaService;
    private TemaService service;

    public TemaController(TemaService service, TemaService temaService) {
        this.service = service;
        this.temaService = temaService;
    }

    @GetMapping
    public ResponseEntity<List<Tema>> listar(){
        List<Tema> lista = service.findAll();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tema> getById(@PathVariable Long id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tema> criarUsuario(@RequestBody Tema tema){
        Tema temasalvo  =service.save(tema);
        System.out.println("Salvo com sucesso");
        return ResponseEntity.status(201).body(temasalvo);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteTemaById(id);
        return ResponseEntity.noContent().build();
    }
}
