package SenaleStudio.Controller;
import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import SenaleStudio.Modelo.Contacto;
import SenaleStudio.Repository.ContactoRepository;
import SenaleStudio.Service.EmailService;

@RestController
@RequestMapping("/api/contacto")
public class ControllerContacto {
    @Autowired
    private ContactoRepository contactoRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Map<String, String>> recibirContacto(@RequestBody Contacto contacto){
        //guardar el mensaje en h2
        contactoRepository.save(contacto);

        String asunto = "Nuevo mensaje de: " + contacto.getNombre();
        String cuerpo = "Mensaje de " + contacto.getNombre() + " (" + contacto.getEmail() + "):\n\n" + contacto.getMensaje();
        emailService.enviarCorreo("sstudios.cl@gmail.com", asunto, cuerpo);

        //que salga en pantalla que esta enviado
        Map<String, String> respuesta= Collections.singletonMap("mensaje", "Mensaje recibido correctamente");
        return ResponseEntity.ok(respuesta);
    }
}
