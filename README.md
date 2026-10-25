# Guía del comprobante de egreso

Sitio educativo en español colombiano sobre el comprobante interno de egreso, sus soportes y el registro contable de un pago. Incluye un recorrido interactivo de cuatro etapas, fichas de documentos que se despliegan con hover, teclado o toque y un caso práctico con respuesta interactiva.

## Ejecutar en local

No requiere instalación de dependencias. Desde esta carpeta, inicia un servidor estático:

```bash
python -m http.server 4173
```

Abre `http://localhost:4173` en el navegador.

## Archivos

- `index.html`: contenido y estructura semántica.
- `styles.css`: identidad visual, composición adaptable y estados de accesibilidad.
- `app.js`: navegación móvil, recorrido interactivo y ejercicio con retroalimentación.
- `assets/`: marca SENA, fotografías, ilustración transparente de los aprendices, recortes de apoyo para las secciones contables y el QR de la actividad final.

## Fuentes de contenido

- [DIAN: documento soporte en adquisiciones a no obligados](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/soporte-adquisiciones-no-obligados/)
- [DIAN: factura electrónica para compradores](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/me-deben-entregar-factura-electronica/)
- [Manual de identidad visual SENA 2024](https://www.sena.edu.co/es-co/Documents/MANUAL_IDENTIDAD_VISUAL_SENA_2024.pdf)
- [Sitio oficial del SENA](https://www.sena.edu.co/), fuente del logotipo PNG con transparencia incluido en `assets/sena.png`.
- Fotografías de trabajo administrativo y registro contable: [Unsplash](https://unsplash.com/).
- [Decreto 2420 de 2015, Gestor Normativo](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=76745)

El ejemplo contable es orientativo y explicita sus supuestos. Los nombres y códigos de cuenta deben ajustarse al plan contable y a las políticas de cada entidad.

El código QR de cierre abre el reto práctico SENA: https://reto-comprobante-egreso.vercel.app/.
