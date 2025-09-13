package SenaleStudio.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreo(String to, String subjetc, String text){
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setFrom("sstudios.cl@gmail.com");
        mensaje.setTo(to);
        mensaje.setSubject(subjetc);
        mensaje.setText(text);
        mailSender.send(mensaje);
    }
}
