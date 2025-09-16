# Usa una imagen base de OpenJDK e instala Maven
FROM openjdk:17-jdk-slim AS build

# Instalar Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

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

# Segunda etapa: imagen de producción más ligera
FROM openjdk:17-jdk-slim

# Expone el puerto de tu aplicación (por defecto en Spring Boot es 8080)
EXPOSE 8081

# Copia el JAR compilado desde la etapa de build
COPY --from=build /app/target/SenaleStudio-*.jar app.jar

# Comando para ejecutar la aplicación
# Asegúrate de que el nombre del archivo JAR sea el correcto
CMD ["java", "-jar", "app.jar"]