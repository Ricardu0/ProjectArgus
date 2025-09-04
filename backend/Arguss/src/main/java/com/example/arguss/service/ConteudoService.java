package com.example.arguss.service;

import com.example.arguss.model.Conteudo;
import com.example.arguss.repository.ConteudoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class ConteudoService {

    private final ConteudoRepository repository;

    public Conteudo save(Conteudo conteudo){
        return repository.save(conteudo);
    }

    public List<Conteudo> listar(){ return repository.findAll(); }

    public void deleteConteudoById(Long id){
        repository.deleteById(id);
    }

    public Conteudo updateConteudo(Conteudo conteudo){
        return repository.save(conteudo);
    }
    public Optional<Conteudo> getConteudoById(Long id){
        return repository.findById(id);
    }
}
