package com.example.arguss.service;

import com.example.arguss.model.Subtema;
import com.example.arguss.model.Tema;
import com.example.arguss.repository.SubtemaRepository;
import com.example.arguss.repository.TemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubtemaService {

    private final TemaRepository temaRepository;
    private final SubtemaRepository repository;

    public List<Subtema> listarTodos(){
        return repository.findAll();
    }

    public Subtema saveSubtema(Subtema subtema) {

        Long temaId = subtema.getTema().getId();
        Tema tema = temaRepository.findById(temaId)
                .orElseThrow(() -> new RuntimeException("Tema com id nao encontrado"));
        subtema.setTema(tema);
        return repository.save(subtema);
    }

    public Optional<Subtema> getSubtema(Long id){
        return repository.findById(id);
    }

    public Subtema updateSubtema(Subtema subtema){
        return repository.save(subtema);
    }

    public Optional<Subtema> deleteSubtema(Long id){
        repository.deleteById(id);
        return Optional.empty();
    }
}
