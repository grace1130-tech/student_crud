# ── Build stage ──
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install bash and dos2unix to ensure line endings are clean on Linux
RUN apk add --no-cache bash dos2unix

# Copy Gradle wrapper and configuration files first for Docker layer caching
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Convert Windows CRLF to LF and ensure executable permissions
RUN dos2unix gradlew && chmod +x ./gradlew

# Copy source code and build executable jar
COPY src ./src
RUN ./gradlew bootJar --no-daemon -x test

# ── Runtime stage ──
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
