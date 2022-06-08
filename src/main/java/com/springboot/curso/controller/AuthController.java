package com.springboot.curso.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.curso.dao.UsuarioDao;
import com.springboot.curso.models.Usuario;
import com.springboot.curso.utils.JWTUtil;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){

        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);

        if(usuarioLogueado != null){
            // se pudo iniciar sesión correctamente
            
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());

            return tokenJwt;
        };
        return "FAIL";
    }
}
