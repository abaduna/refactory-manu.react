package com.menu.comida.Config;
import com.menu.comida.ComidaApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ImageUploadListener {

    private final ApplicationContext applicationContext;

    public ImageUploadListener(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
    @EventListener
    public void handleImageUploadEvent(ImageUploadEvent event) {
        // Lógica para manejar la subida de la imagen
        // ...

        // Reiniciar la aplicación
        restart();
    }

    private void restart() {
        Thread thread = new Thread(() -> {
            SpringApplication.exit(applicationContext, () -> 0);
            SpringApplication.run(ComidaApplication.class);
        });

        thread.setDaemon(false);
        thread.start();
    }
}
