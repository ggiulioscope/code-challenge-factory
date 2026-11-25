# Buscar sala · Guion para quien entrevista

**Etapa 1. Trabajo en casa, 45–60 minutos.** Envía solo la carpeta [meeting-slot](../candidates/meeting-slot/). Pide código, pruebas y una explicación del coste de búsqueda. En esta etapa solo se sugiere una sala. La preparación entre reuniones aparece por primera vez en la entrevista.

**Qué evaluamos.** ¿Puede la persona convertir horarios en comparaciones precisas, elegir entre varias respuestas válidas y justificar por qué encontró la primera? Un error de un minuto puede ocultar una sala disponible o permitir dos reuniones a la vez.

## Antes de la entrevista

Ejecuta las pruebas y localiza la comparación que permite que una reunión termine cuando empieza otra. Una solución de referencia descarta salas pequeñas y recorre las reservas de cada sala ordenadas por inicio. Empieza con un posible inicio en el comienzo de la ventana. Si la reunión cabe antes de la próxima reserva, tiene el primer hueco de esa sala. Si se solapan, avanza hasta el mayor entre el inicio posible y el fin de la reserva. Al terminar revisa el hueco final. En todos los casos exige que el fin quepa en la ventana. Compara las salas por hora de inicio y luego por ID.

Con R salas y B reservas, agrupar y ordenar una vez cuesta O(R + B log B) en el peor caso. Un recorrido minuto a minuto también puede ser correcto en una ventana de un día. Pide que explique cuántas veces revisa una reserva y cómo cambiaría ese coste con ventanas más largas.

## Etapa 2. Conversación de 20 minutos

| Tiempo | Pregunta para hacer en voz alta | Qué observar o preguntar después |
|---|---|---|
| 0–4 min | «Usa tu código y el ejemplo de las 09:00. ¿Por qué gana la sala 2? ¿Qué comparación permite que el grupo salga a las 09:30?» | Debe seguir un camino concreto por su solución. Una reunión que termina a las 09:30 deja la sala libre para otra que empieza en ese instante. |
| 4–8 min | «Una sala está ocupada de 09:00 a 09:40 y también de 09:10 a 09:20. Buscamos diez minutos entre 09:00 y 10:00. ¿Cuál es el primer hueco?» | De 09:40 a 09:50. Pide que trace el estado tras la reserva corta. Si vuelve a las 09:20, puede ofrecer un horario ocupado. Pregunta qué pasaría si otra sala con ID menor ofreciera las mismas 09:40. |
| 8–15 min | «Ahora hacen falta diez minutos de limpieza entre reuniones consecutivas en la misma sala. La ventana limita solo la reunión solicitada. ¿Qué adaptarías?» | Deja que dibuje la línea de tiempo. El nuevo inicio debe dejar diez minutos después de la reserva anterior y el nuevo fin debe dejar diez minutos antes de la siguiente. También importan las reservas justo fuera de la ventana. El intervalo devuelto contiene únicamente la reunión. |
| 15–20 min | «Hay reservas de 08:40 a 09:00 y de 09:45 a 10:00. En la ventana de 09:00 a 09:45, ¿caben 25 minutos? ¿Y 26? Convierte la respuesta en una prueba». | El único hueco utilizable es 09:10–09:35. Con 25 minutos cabe exactamente y con 26 devuelve null. Pide que indique qué prueba inicial debería conservar para el caso de cero minutos de limpieza. |

**Cómo cerrar.** Registra una decisión sobre los límites horarios que la persona justificó con un ejemplo y una prueba que distinguiría su solución de otra incorrecta. Evalúa el requisito nuevo por su razonamiento en vivo, separado del resultado del trabajo en casa.
