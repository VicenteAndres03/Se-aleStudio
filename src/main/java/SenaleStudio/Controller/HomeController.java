package SenaleStudio.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "¡Señale Studios API está funcionando correctamente! 🎵\n\n" +
               "Endpoints disponibles:\n" +
               "POST /api/contacto - Para enviar mensajes de contacto\n" +
               "GET /health - Estado del servicio";
    }
    
    @GetMapping("/health")
    public String health() {
        return "OK - Servicio activo";
    }
}