FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD service-billing.jar app.jar
RUN sh -c 'touch /app.jar'
ENV JAVA_OPTS=""
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar