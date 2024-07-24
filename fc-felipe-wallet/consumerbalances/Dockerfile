# Fase de Build
FROM maven:3.8.1-openjdk-17 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

# Fase de Runtime
FROM openjdk:17-jdk-buster
WORKDIR /app
ENV APP_JAR_NAME=consumerbalances-0.0.1-SNAPSHOT.jar
ENV TZ=America/Sao_Paulo
COPY --from=build /usr/src/app/target/${APP_JAR_NAME} /app
EXPOSE 8082
ENTRYPOINT java -jar /app/${APP_JAR_NAME}