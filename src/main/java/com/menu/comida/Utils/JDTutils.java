package com.menu.comida.Utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.menu.comida.models.User;

import java.util.Date;

public class JDTutils {
    private static final String SECRET_KEY = "abaduna";
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

    public static   String generateToken(User user){
        String token = JWT.create()
                .withIssuer("Atrhur")
                .withClaim("userId", user.getId())
                .withIssuedAt(new Date())
                .withExpiresAt(getExpiresAt())
                .sign(algorithm);
        return token;
    }

    private static Date getExpiresAt() {
        return new Date(System.currentTimeMillis() + 100L * 60 * 60 * 24 * 14);//14 dias
    }

    public static String getIdByToken(String token){
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("Atrhur")
                .build();
        DecodedJWT decoded = verifier.verify(token);
        String userId = decoded.getClaim("userId").toString();
        return userId;
    }
}
