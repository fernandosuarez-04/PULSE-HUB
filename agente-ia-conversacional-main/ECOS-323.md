Aprendizajes: 
Comprendí cómo los agents en OpenAI se estructuran en tres capas: razonamiento (modelo), orquestación (Responses API + herramientas) y ejecución (ChatKit o interfaces realtime). Esto facilita pasar de “prompt” a “sistema interactivo”.

Los Evals no son solo métricas, sino una práctica continua: trazan respuestas, comparan salidas y dan retro para mejorar prompts, latencia y calidad. Integrarlos en CI/CD garantiza que cada cambio preserve el desempeño.

Construir el Hello Agent en TypeScript con separación (main, agent, tools) mostró la importancia de una arquitectura mantenible: cada herramienta (clima, orquestación, audio) puede evolucionar sin romper el flujo.


Mejoras:
Podria hacer que el agente conteste mas cosas mas que solo al clima 
Mejorar el tonozo de voz con elevenlabs
automatizar pruebas, compilación y despliegue del agente. Hoy el flujo aún es manual.


Acciones futuras:
Extender el agente con una segunda herramienta
Por ejemplo: integrar una API de calendario o búsqueda, para practicar orquestación multi-paso (cumple ECOS-317).

Configurar Evals automáticos en pre-merge
Crear 3-5 Evals en evals/ y vincularlos a GitHub Actions (cumple ECOS-318/319).

Demo y retro interna
Grabar un video de 5 min mostrando: saludo “Hello there Obiwan”, consulta de clima, y respuesta de voz (cumple ECOS-322/323).