package com.example.arguss.service;

import com.example.arguss.model.Usuario;
import com.example.arguss.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor

public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public List<Usuario> listarTodos(){
        return repository.findAll();
    }

    public Usuario save(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha())); // Criptografa
        return repository.save(usuario);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Usuario update(Usuario usuario){
        if (usuario.getSenha() != null) {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha())); // Recriptografa
        }
        return repository.save(usuario);
    }

    public Optional<Usuario> buscarPorId(Long id){
        return repository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}
