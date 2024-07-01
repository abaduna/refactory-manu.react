package com.menu.comida.Controller;


import com.menu.comida.DTO.PutchaseDTO;
import com.menu.comida.Utils.JDTutils;
import com.menu.comida.models.User;
import com.menu.comida.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    AuthService authService;
    @PostMapping("/auth/login")
    public String login(@RequestBody PutchaseDTO.ReqLogin req) {
        User user =   authService.login(req.getEmail(),req.getPassword());
        return JDTutils.generateToken(user);
    }
    @PostMapping("/auth/Create")
    public String updateLogin(@RequestBody PutchaseDTO.ReqLogin req) {
        return authService.updateLogin(req.getEmail(),req.getPassword());

    }
}
