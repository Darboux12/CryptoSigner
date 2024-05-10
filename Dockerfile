FROM eclipse-temurin:17-jdk
MAINTAINER dariusz
COPY api/target/api-1.0.0.jar api-1.0.0.jar
ENTRYPOINT ["java","-jar","/api-1.0.0.jar"]
