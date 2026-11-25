# Entregas parciales · Guion para quien entrevista

**Etapa 1. Trabajo en casa, 45–60 minutos.** Envía solo la carpeta [split-deliveries](../candidates/split-deliveries/). Pide que devuelva código, pruebas y una explicación breve. La consigna supone un solo operador. Los reintentos de la etapa 2 son un requisito nuevo.

**Qué evaluamos.** ¿Puede la persona traducir una regla de negocio a datos que se puedan consultar? Importan dos hechos distintos: cuántas unidades se pidieron y cuántas llegaron en cada entrega. Una cifra final correcta puede esconder una entrega duplicada o una fila guardada por error.

## Antes de la entrevista

Ejecuta las pruebas e identifica dónde se decide aceptar la entrega. Una solución de referencia guarda una fila por llegada. Busca el pedido, suma las entregas de ese pedido (cero si aún no hay filas) y resta esa suma de la cantidad pedida. Valida la nueva cantidad antes de insertar. Si cabe, inserta una fila y devuelve el saldo anterior menos la llegada. Una solución con saldo almacenado también sirve si conserva el historial y mantiene ambos datos coherentes.

## Etapa 2. Conversación de 20 minutos

| Tiempo | Pregunta para hacer en voz alta | Qué observar o preguntar después |
|---|---|---|
| 0–4 min | «Muéstrame cómo pasa el pedido 17 de diez unidades pendientes a seis cuando llegan cuatro. ¿Qué queda guardado?» | Sigue la llamada desde la entrada hasta la fila insertada. Comprueba que el pedido original sigue indicando diez. Pide que señale la prueba que detectaría una pérdida de historial. |
| 4–8 min | «Ya recibimos cuatro y cinco. El operador escribe dos por error. Después corrige y escribe uno. ¿Qué ve en cada paso?» | El primer intento falla sin dejar fila. El segundo devuelve cero. Pide que enseñe cómo comprobarlo en SQLite y si una entrega del pedido 18 afectaría el cálculo. |
| 8–15 min | «Ahora el escáner reenvía una entrega si pierde la respuesta. Envía dos veces el mismo mensaje de cuatro unidades. Mañana llega otra caja legítima de cuatro. ¿Cómo distinguirías los casos?» | Dale tiempo para cambiar el contrato. Si se atasca, pregunta qué dato puede crear el escáner antes de enviar. Busca un identificador estable de entrega y una restricción de unicidad. Deducir duplicados por cantidad descartaría la segunda caja real. |
| 15–20 min | «Escribe una prueba para tu nuevo contrato. ¿Qué harías si se reutiliza el identificador con otra cantidad?» | Con diez unidades pedidas, A por cuatro deja seis, repetir A mantiene una fila y B por cuatro deja dos. Reutilizar A con otros datos debe producir un conflicto sin cambiar el historial. Acuerda qué devuelve un reintento después de B: si promete el resultado original, debe poder recuperarlo. |

**Cómo cerrar.** Pide a la persona que señale qué cambiaría en su entrega para implementar la prueba nueva. Registra por separado si resolvió el saldo y la persistencia en casa y si pudo definir una identidad estable en la conversación. Acepta otras soluciones si explican cómo sobreviven al caso de una respuesta perdida después de guardar.
