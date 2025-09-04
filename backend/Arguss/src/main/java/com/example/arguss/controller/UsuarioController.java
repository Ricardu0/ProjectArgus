package com.example.arguss.controller;

import com.example.arguss.model.Usuario;
import jakarta.persistence.Id;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.arguss.service.UsuarioService;

import java.util.List;
import java.util.Optional;

import static org.springframework.util.ObjectUtils.isEmpty;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")

public class UsuarioController {
    private final UsuarioService service;
    //injetando/trazendo a service, basta somente usar ela como service e nao como usuario service.

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    //Get lista
    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        List<Usuario> lista = service.listarTodos();
        System.out.println("Fazendo listagem");
        return ResponseEntity.ok(lista);
    }
    /*O metodo listar retorna um responseentity, com corpo de lista de usuarios
    no qual ele cria uma lista de usuarios, chamando atraves da service, do metodo listar todos
    ele retorna um sout, para auxiliar na observvabilidade
    retorna o response entity, com a lista.
     */

    //buscar por id
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id //PathVariable indica que o id sera injetado na url, enviado para o id
    ) {
        return service.buscarPorId(id)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    //Delete por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Optional<Usuario> opt = service.buscarPorId(id);
        if (opt.isEmpty()) {
            System.out.println("Sem conteudo para deletar");
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    //POST
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario){
        Usuario Novousuario = service.save(usuario);
        return ResponseEntity.status(201).body(Novousuario);
    }

}


