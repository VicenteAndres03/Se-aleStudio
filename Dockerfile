# Usa una imagen base de Java, preferiblemente una versión de LTS (como 17 o 21)
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el pom.xml y las dependencias de Maven
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline

# Copia el código fuente
COPY src ./src

# Compila el proyecto
RUN mvn clean package -DskipTests

# Expone el puerto de tu aplicación (por defecto en Spring Boot es 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/SenaleStudio-0.0.1-SNAPSHOT.jar"]