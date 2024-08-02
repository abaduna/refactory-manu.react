package com.menu.comida.Config;

import com.menu.comida.Utils.JDTutils;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
@Component
public  class FooodAccessFilter implements Filter{
    public void CustomAccessFilter() {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        boolean authorized = isAuthorized(request);

        System.out.println("authorized " + authorized);
        if (authorized) {
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(null, null, Collections.emptyList()));
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }

    private boolean isAuthorized(HttpServletRequest request) {
        String currentUrl = request.getRequestURI(); // obtiene la URL
        String[] availableUrls = {
                "/api/auth/login",
                "/api/auth/create",
                "/api/ordenes"
        };

        boolean authorized = Arrays.asList(availableUrls).contains(currentUrl);
        boolean isApiResource = currentUrl.startsWith("/api"); // devuelve true si empieza con la ruta "api"
        boolean isStart = currentUrl.startsWith("/api/food");
        boolean isImg = currentUrl.startsWith("/api/food/image");

        if (authorized || !isApiResource || isStart || isImg) {
            return true;
        }

        try {
            String token = request.getHeader("Authorization");
            if (token != null && !token.isEmpty()) {
                String userId = JDTutils.getIdByToken(token);
                // Asumiendo que JDTutils.getIdByToken(token) lanza una excepción si el token es inválido
                return true;
            } else {
                return false;
            }
        } catch(Exception e) {
            System.out.println(e);
            return false;
        }
    }

}

