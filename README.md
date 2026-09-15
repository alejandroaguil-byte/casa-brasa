# Casa Brasa

**Demo de portafolio · [BobbaSystem](https://bobbasystem.cl)**

Parrilla contemporánea en Ñuñoa: un sitio que consigue mesas y un panel que ordena el servicio del día.

![Salón de Casa Brasa](public/images/hero.jpg)

Casa Brasa es un restaurante ficticio. El proyecto existe para mostrar, con un caso concreto, el tipo de solución que BobbaSystem construye para pequeños negocios de Santiago.

## El caso

**Punto de partida.** El local funcionaba como tantos en Santiago: la carta en un PDF, las reservas por WhatsApp, el salón anotando cubiertos en un cuaderno. El Instagram traía consultas; el chat las perdía.

**Qué se construyó.** Un sitio con la identidad del local — carta, historia, horarios — y un flujo de reserva de un minuto. Sobre esa base, un panel de salón: servicio del día, mesas, walk-in, estados y notas del comensal.

**Por qué importa.** El cliente deja de preguntar si hay mesa a las 21:00. El salón deja de reconstruir el turno de memoria. La herramienta está hecha alrededor de cómo trabaja un restaurante de barrio.

## Recorrer la demo

| Superficie | Qué hace |
| --- | --- |
| Sitio público | Identidad, carta, horarios y llamado a reservar |
| Reservar | Fecha, hora, cupo real, notas y confirmación |
| Salón | Confirmar, sentar, cerrar, no-show, walk-in y 12 mesas |
| Caso | El relato de portafolio, en el tono de BobbaSystem |

1. Reserva una mesa como lo haría un comensal.
2. Entra al salón y verás esa reserva en el servicio del día.
3. Confírmala, asígnala a una mesa y siéntala. Prueba un walk-in si quieres.

Los datos viven en el navegador. El botón **Resetear demo** vuelve al escenario inicial.

## Stack

React 19, TanStack Start, Tailwind CSS, Zustand y TypeScript.

## Desarrollo

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

## BobbaSystem

Atención directa, comunicación clara y soluciones pensadas para las necesidades reales de un negocio.

- Sitio: [bobbasystem.cl](https://bobbasystem.cl)
- Santiago · disponible para nuevos proyectos
