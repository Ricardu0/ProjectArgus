package com.example.arguss.controller;

import com.example.arguss.model.Subtema;
import com.example.arguss.service.SubtemaService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subtemas")
public class SubtemaController {

    private final SubtemaService subtemaService;
    private final SubtemaService service;

    //GET
    @GetMapping
    public ResponseEntity<List<Subtema>> listar(){
        List<Subtema> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }


    //get por id

    @GetMapping("/{id}")
    public ResponseEntity<Subtema> findById(@PathVariable Long id){
       return service.getSubtema(id)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteSubtema(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Subtema> create(@RequestBody Subtema subtema){
        Subtema novosubtema = service.saveSubtema(subtema);
        return ResponseEntity.ok(novosubtema);
    }

}
