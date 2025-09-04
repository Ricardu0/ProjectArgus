package com.example.arguss.controller;

import com.example.arguss.model.Conteudo;
import com.example.arguss.service.ConteudoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor

//ENDPOINT



@RequestMapping("/conteudos")



public class ConteudoController {

    private final ConteudoService conteudoService;

    @GetMapping
    public ResponseEntity<List<Conteudo>> listar(){
        List <Conteudo> conteudos = conteudoService.listar();
        System.out.println("\u001B[32mOperação de listagem de conteudo feita com sucesso\u001B[0m");
        return ResponseEntity.ok(conteudos);

    }

    //GET DO ID
    @GetMapping("/{id}")
    public ResponseEntity<Conteudo> findById(@PathVariable Long id){
        System.out.println("Realizando get");
        Optional<Conteudo> opt = conteudoService.getConteudoById(id);
        return opt
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }



    //POST
    @PostMapping
    public ResponseEntity<?> createConteudo(@RequestBody Conteudo conteudo) {
        try {
            //declara o saved conteudo, e recebe conteudo?
            Conteudo savedConteudo = conteudoService.save(conteudo);

            System.out.println("Realizando post");
            //retorna com status http
            return ResponseEntity.status(HttpStatus.CREATED).body(savedConteudo);
        }
        //retorna a excecao com o erro
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar conteudos" + e.getMessage());
        }
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConteudo(@PathVariable Long id){
        Optional<Conteudo> opt = conteudoService.getConteudoById(id);

        if (opt.isEmpty()) {
            System.out.print("Nao foi encontrado conteudo para deletar");
            return ResponseEntity.notFound().build();
        }
        conteudoService.deleteConteudoById(id);
        System.out.println("Realizando delete");
        return ResponseEntity.noContent().build();
    }
}
