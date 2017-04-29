FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD service-stock.jar app.jar
RUN sh -c 'touch /app.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ] 
