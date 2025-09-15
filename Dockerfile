# Usa una imagen base de Java, preferiblemente una versión de LTS (como 17 o 21)
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el pom.xml y las dependencias de Maven
COPY pom.xml .

# Descarga las dependencias de Maven (esto acelera las compilaciones futuras)
# La sintaxis de "mount" es para optimizar la caché de Docker y no es un comando de Maven.
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline

# Copia el código fuente
COPY src ./src

# Compila el proyecto y crea el archivo JAR, saltándose las pruebas
RUN mvn clean package -DskipTests

# Expone el puerto de tu aplicación (por defecto en Spring Boot es 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación
# Asegúrate de que el nombre del archivo JAR sea el correcto
CMD ["java", "-jar", "target/SenaleStudio-0.0.1-SNAPSHOT.jar"]