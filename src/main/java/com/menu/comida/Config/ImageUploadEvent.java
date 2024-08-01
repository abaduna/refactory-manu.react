package com.menu.comida.Config;
import org.springframework.context.ApplicationEvent;

public class ImageUploadEvent extends ApplicationEvent {
    public ImageUploadEvent(Object source) {
        super(source);
    }
}