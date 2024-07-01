package com.menu.comida.services;

import com.menu.comida.Repository.UserRepositori;
import com.menu.comida.models.User;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImp implements  AuthService{
    private static final String SECRET_KEY = "abadunaComida";

    @Autowired
    private UserRepositori userRepositori;

    @Override
    public User login(String email, String password) {
        String hashPassword = Hashing.sha256()
                .hashString(password + SECRET_KEY, StandardCharsets.UTF_8)
                .toString();

        List<User> result = userRepositori.findByEmailOrAddress(email, hashPassword);
        if (result.isEmpty()) {
            return null;
        } else {
            return result.get(0);
        }
    }

    @Override
    public String updateLogin(String email, String password) {
        User user = new User();
        String hashPassword = Hashing.sha256()
                .hashString(password + SECRET_KEY, StandardCharsets.UTF_8)
                .toString();
        user.setPassword(hashPassword);
        user.setEmail(email);
        userRepositori.save(user);
        return "successfully login";
    }
}
