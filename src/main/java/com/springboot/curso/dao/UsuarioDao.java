package com.springboot.curso.dao;

import java.util.List;

import com.springboot.curso.models.Usuario;

public interface UsuarioDao {
    List<Usuario> getUsuarios();

    void eliminar(Long id);

	void registrar(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
