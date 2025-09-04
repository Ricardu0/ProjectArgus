package com.example.arguss.repository;

import com.example.arguss.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

//aqui estamos criando uma inferace para repassar informacoes dos controllers, até os usuarios
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    List<Usuario> id(int id);

    Optional<Usuario> findByEmail(String email);
}
