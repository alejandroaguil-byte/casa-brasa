import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { DemoBanner } from "@/components/demo-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { formatClp, hours, menu, restaurant } from "@/lib/data";

export const Route = createFileRoute("/")({ component: Home });

const featured = menu
  .flatMap((section) => section.items.filter((item) => item.featured))
  .slice(0, 4);

function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <DemoBanner />
      <div className="relative min-h-[92vh] overflow-hidden bg-ink text-paper">
        <Photo
          src="/images/hero.svg"
          alt="Salón de Casa Brasa al anochecer, con la parrilla encendida al fondo."
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="relative flex min-h-[92vh] flex-col">
          <SiteHeader dark />
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-16 pt-20 sm:px-6">
            <div className="stagger-in max-w-2xl">
              <p className="text-xs tracking-[0.28em] text-brass uppercase">
                Ñuñoa · Santiago
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
                El fuego
                <br />
                como oficio.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-paper/75">
                Parrilla contemporánea, carta corta y mesas que se reservan
                en un minuto. Un restaurante de barrio que no improvisamos
                por WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="cream" size="lg">
                  <Link to="/reservar">Reservar mesa</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/menu">Ver la carta</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted uppercase">
            La casa
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Carbón, tiempo y una mesa lista.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Casa Brasa abre en Irarrázaval con una cocina de parrilla a la
            vista. No hay carta infinita ni reservas perdidas en un chat:
            el salón ve cada mesa, cada hora y cada nota del comensal.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Este sitio es un proyecto demo de BobbaSystem: así se ve una
            solución a medida cuando un restaurante de Santiago necesita
            atraer clientes y ordenar el servicio del día.
          </p>
        </div>
        <figure className="overflow-hidden rounded-xl">
          <Photo
            src="/images/brasas.svg"
            alt="Brasas encendidas en la parrilla de la casa."
            className="photo aspect-16/10 w-full object-cover"
          />
        </figure>
      </section>

      <section className="bg-ink py-16 text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.22em] text-brass uppercase">
                Carta
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight">
                Lo que sale de la brasa.
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm text-paper/70 hover:text-paper"
            >
              Carta completa
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item, index) => {
              const images = [
                "/images/provoleta.svg",
                "/images/pulpo.svg",
                "/images/bife.svg",
                "/images/leche-asada.svg",
              ];
              return (
                <article key={item.name} className="group">
                  <div className="overflow-hidden rounded-lg">
                    <Photo
                      src={images[index]}
                      alt={item.name}
                      className="photo aspect-4/3 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl">{item.name}</h3>
                    <p className="text-sm tabular-nums text-brass">
                      {formatClp(item.price)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-paper/60">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <figure className="overflow-hidden rounded-xl">
          <Photo
            src="/images/vino.svg"
            alt="Copa de Carmenère en la mesa."
            className="photo aspect-3/2 w-full object-cover"
          />
        </figure>
        <div>
          <p className="text-xs tracking-[0.22em] text-muted uppercase">
            Reservar
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">
            Una mesa, sin ida y vuelta.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Elige día, hora y número de personas. El salón recibe la
            reserva al instante, con notas, ocasión y cupo real — no una
            captura de pantalla en el grupo del turno.
          </p>
          <Button asChild className="mt-7" size="lg">
            <Link to="/reservar">Reservar ahora</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 text-ember" />
            <div>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">
                Dirección
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                {restaurant.address}
                <br />
                {restaurant.neighborhood}, {restaurant.city}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-5 text-ember" />
            <div>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">
                Horarios
              </p>
              <ul className="mt-1 space-y-1 text-sm">
                {hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-4">
                    <span>{row.days}</span>
                    <span className="text-muted">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="mt-0.5 size-5 text-ember" />
            <div>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">
                Contacto
              </p>
              <a
                href={`tel:${restaurant.phoneTel}`}
                className="mt-1 block text-sm underline-offset-4 hover:underline"
              >
                {restaurant.phoneDisplay}
              </a>
              <p className="mt-1 text-sm text-muted">{restaurant.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-paper">
        <Photo
          src="/images/fachada.svg"
          alt="Fachada de Casa Brasa de noche."
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="text-xs tracking-[0.22em] text-brass uppercase">
            Proyecto demo
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Así se presenta un negocio de Santiago cuando la herramienta
            está hecha a su medida.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cream">
              <Link to="/caso">Leer el caso</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/salon">Entrar al salón</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
