package com.example.arguss.service;
import java.util.List;
import java.util.Optional;
import com.example.arguss.repository.TemaRepository;

import com.example.arguss.model.Tema;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TemaService {

    private final TemaRepository temaRepository;

    public Tema save(Tema tema) {
        return temaRepository.save(tema);
    }

    public Optional<Tema> findById(Long id) {
        return temaRepository.findById(id);
    }

    public List<Tema> findAll() {
        return temaRepository.findAll();
    }

    public void deleteTemaById(Long id) {
        temaRepository.deleteById(id);
    }

    public Tema update(Tema tema) {
        if (tema.getId() != null && temaRepository.existsById(tema.getId())) {
            return temaRepository.save(tema);
        }
        return null;
    }

}
