Para implementar la internacionalización dentro del sitio web, nos tocó crear un archivo con todo el texto del sitio web en español ('es.ts') y todo el texto del sitio web en inglés ('en.ts'). Dentro de cada archivo se puede ver cómo todo el texto del sitio web está incluido para así evitar que mucho texto quede hardcoded.

Para implementar todo el contenido de estos archivos dentro del sitio web, se usó el parámetro 't' en 'AppContext.tsx' (el cual representa la TranslationKey) dentro del hook 'useApp'.

Cuando se importa el antedicho hook dentro de un archivo, ahora se pueden importar las palabras en español e inglés y se pueden usar para así poner tener ambas opciones de lenguaje en vez de hacer hardcode.