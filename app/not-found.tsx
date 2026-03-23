"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HeartPulse, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-12">      <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-sky-200/20 blur-3xl" />
      <div className="absolute right-10 top-20 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl" />
    </div>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-14">
        <div className="order-2 flex w-full max-w-xl flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <HeartPulse className="h-4 w-4 text-primary" />
            MedicoApp
          </div>

          <h1 className="text-6xl font-black tracking-tight text-primary sm:text-7xl md:text-8xl">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Esta página no está disponible
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Parece que la página que intentas abrir no existe, fue movida o el
            enlace no es correcto. Puedes volver al inicio o continuar
            navegando desde el panel principal.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-2xl px-6">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ir al inicio
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-2xl px-6">
              <Link href="javascript:history.back()">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver atrás
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold">Sugerencia</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                Revisa que la ruta escrita sea correcta.
              </p>
            </div>

            <div className="rounded-2xl border bg-background/80 p-4 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold">Acceso rápido</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                Regresa al dashboard y continúa desde el menú lateral.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center lg:order-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-2xl" />

            <div className="relative flex h-80 w-[320px] items-center justify-center rounded-[2rem] border bg-background/85 shadow-2xl backdrop-blur sm:h-95 sm:w-95">
              <div className="absolute left-8 top-8 rounded-2xl border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                Ruta no encontrada
              </div>

              <div className="absolute bottom-8 right-8 rounded-2xl border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                Error 404
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10">
                  <SearchX className="h-12 w-12 text-primary" />
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-lg font-semibold">Ups...</p>
                  <p className="max-w-60 text-sm leading-6 text-muted-foreground">
                    No encontramos la pantalla que estás buscando dentro del sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}