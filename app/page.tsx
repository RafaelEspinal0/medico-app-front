export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Bienvenido al sistema de gestión del centro de salud.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Médicos</p>
          <h3 className="mt-2 text-3xl font-bold">18</h3>
        </div>

        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Empleados</p>
          <h3 className="mt-2 text-3xl font-bold">36</h3>
        </div>

        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Pacientes</p>
          <h3 className="mt-2 text-3xl font-bold">124</h3>
        </div>

        <div className="rounded-3xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Sustituciones activas</p>
          <h3 className="mt-2 text-3xl font-bold">4</h3>
        </div>
      </div>

      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Resumen general</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Podras gestionar todo desde una sola app, una aplicación personalizada para cualquier 
          clinica, hospital. Medico-paciente y administrativamente.
        </p>
      </div>
    </div>
  );
}