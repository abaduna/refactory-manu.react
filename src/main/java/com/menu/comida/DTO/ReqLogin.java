package com.menu.comida.DTO;

import lombok.Data;

public class ReqLogin {
    @Data
    public static class ReqLoginv2 {
        private String email;
        private String password;
    }
}
