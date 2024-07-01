package com.menu.comida.services;

import com.menu.comida.models.User;

public interface AuthService {
    User login(String email, String password);
    String updateLogin(String email, String password);
}
