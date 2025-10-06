Para crear un contenedor de Docker, seguimos los siguientes pasos:

1. Usar el comando 'docker ps' para verificar que Docker esté descargado. Si no lo está, puede descargar Docker Desktop y activar el engine por la aplicación.

2. Cuando ya esté corriendo el engine, ingresar el comando 'docker build -t statfut .' , en este caso 'statfut' siendo el nombre escogido por el usuario.

3. Ingresar el comando 'docker run -d --name statfut -p 8080:80 statfut'. Aquí se puede escoger la dirección IP del sitio web junto con el nombre escogido anteriormente.

4. Ingresar a la dirección IP anteriormente escogida (en este caso http://localhost:8080/) y verificar que el sitio web esté corriendo de manera correcta.