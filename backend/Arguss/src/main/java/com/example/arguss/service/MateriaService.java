package com.example.arguss.service;


import com.example.arguss.model.Materia;
import com.example.arguss.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.arguss.repository.MateriaRepository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository repository;

    public List<Materia> listarMaterias(){
        return repository.findAll();
    }

    public Materia deleteMateria(Long id){
        repository.deleteById(id);
        return null;
    }

    public Optional<Materia> getById(Long id) {
        return repository.findById(id);
    }

    public Materia saveMateria(Materia materia){
        return repository.save(materia);
    }

    public Materia materiaUpdate (Materia materia){
        return repository.save(materia);
    }

    public Optional<Materia> getMateria(Long id){
        return repository.findById(id);
    }

}
