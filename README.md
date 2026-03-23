# MedicoApp Frontend

Frontend administrativo para la gestión de médicos, pacientes, empleados, vacaciones, horarios y sustituciones, construido con **Next.js**, **TypeScript**, **shadcn/ui**, **Tailwind CSS** y **React Query**.

Este proyecto consume una API externa y está diseñado con una arquitectura modular, escalable y orientada a una buena experiencia de usuario.

---

## Tabla de contenido

- [Descripción general](#descripción-general)
- [Tecnologías principales](#tecnologías-principales)
- [Características del sistema](#características-del-sistema)
- [Módulos implementados](#módulos-implementados)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Arquitectura del frontend](#arquitectura-del-frontend)
- [Convenciones del proyecto](#convenciones-del-proyecto)
- [Integración con la API](#integración-con-la-api)
- [Estado del proyecto](#estado-del-proyecto)

---

## Descripción general

**MedicoApp Frontend** es una interfaz web administrativa para operar distintos procesos relacionados con la gestión de personal médico y administrativo.

La aplicación permite administrar:

- médicos
- pacientes
- empleados
- vacaciones
- horarios
- sustituciones

El sistema está construido con un enfoque modular, reutilizable y consistente, utilizando componentes desacoplados, hooks de datos y una capa de servicios centralizada para el consumo de API.

---

## Tecnologías principales

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack React Query**
- **Axios**
- **Lucide React**
- **Sonner** para notificaciones toast

---

## Características del sistema

- Interfaz moderna, limpia y responsive
- Arquitectura modular por dominio
- Consumo de API centralizado
- Manejo de estado remoto con React Query
- Formularios reutilizables para crear y editar
- Dialogs para ver detalle, editar y confirmar acciones
- Filtros y búsquedas por módulo
- Diseño consistente entre todos los CRUDs
- Preparado para escalar a nuevos módulos sin romper la estructura

---

## Módulos implementados

### 1. Médicos
Gestión completa del personal médico.

Incluye:
- listado de médicos
- filtros por tipo y estado
- creación y edición
- visualización de detalle
- eliminación
- gestión de horarios por médico

### 2. Pacientes
Gestión de pacientes y asignación de médico.

Incluye:
- listado de pacientes
- creación y edición
- visualización de detalle
- eliminación
- asignación de médico desde formulario

### 3. Empleados
Gestión del personal no médico.

Incluye:
- listado de empleados
- filtros por tipo de personal
- creación y edición
- visualización de detalle
- eliminación

### 4. Vacaciones
Gestión de vacaciones asociadas a la entidad base de empleado.

**Nota importante:**  
Aunque la API utiliza rutas como `/api/Vacaciones/empleado/{empleadoId}`, en backend los médicos y el personal comparten la base de empleado.  
Por esta razón, el módulo permite gestionar vacaciones tanto de médicos como de empleados utilizando el mismo identificador base.

Incluye:
- selección de colaborador
- consulta de vacaciones por colaborador
- registro de vacaciones
- edición de vacaciones
- visualización de detalle

### 5. Horarios
Gestión de horarios de médicos.

Incluye:
- consulta de horarios por médico
- configuración semanal
- eliminación de horarios
- carga visual de horarios registrados

### 6. Sustituciones
Gestión de sustituciones asociadas a médicos.

Incluye:
- listado de médicos con acciones
- historial de sustituciones por médico
- registro de nuevas sustituciones

---

## Estructura del proyecto

```bash
src/
  app/
    empleados/
    medicos/
    pacientes/
    sustituciones/
    vacaciones/

  components/
    layout/
    providers/
    medicos/
    pacientes/
    personal/
    sustituciones/
    vacaciones/

  hooks/
    use-medicos.ts
    use-pacientes.ts
    use-personal.ts
    use-sustituciones.ts
    use-vacaciones.ts
    use-horarios.ts
    use-enums.ts
    use-vacation-people.ts

  lib/
    api.ts
    extract-api-error.ts
    utils.ts

  services/
    medicos.service.ts
    pacientes.service.ts
    personal.service.ts
    sustituciones.service.ts
    vacaciones.service.ts
    horarios.service.ts
    enums.service.ts

  types/
    api.ts
    medico.ts
    paciente.ts
    personal.ts
    sustitucion.ts
    vacacion.ts
    horario.ts
    enums/
      tipo-medito.enum.ts
      tipo-personal.enum.ts
      tipo-vacacion.enum.ts
```

---

## Instalación

Clona el repositorio e instala las dependencias:

### Con npm

```bash
npm install
```

### Con pnpm

```bash
pnpm install
```

---

## Variables de entorno

Crea un archivo `.env` o remplaza `.example.env` en la raíz del proyecto con la siguiente variable:

```env
NEXT_PUBLIC_API_BASE_URL=
```

Esta variable define la URL base para el consumo de la API.

---

## Ejecución en desarrollo

### Con npm

```bash
npm run dev
```

### Con pnpm

```bash
pnpm dev
```

La aplicación estará disponible en:

```txt
http://localhost:3000
```

---

## Arquitectura del frontend

El proyecto sigue una arquitectura dividida por responsabilidades:

### `types/`
Contiene los contratos TypeScript alineados con la API.

### `services/`
Encapsula el acceso HTTP mediante `axios` y centraliza el consumo de endpoints.

### `hooks/`
Contiene hooks de React Query para consultas y mutaciones.

### `components/`
Contiene la UI desacoplada por módulo:
- vista principal
- tabla
- filtros
- estadísticas
- formularios
- diálogos de detalle y confirmación

### `app/`
Define las páginas del sistema usando App Router.

---

## Notas de desarrollo

- El proyecto **no utiliza autenticación** actualmente.
- La estrategia actual del frontend está orientada a simplicidad, claridad y modularidad.
- El sistema fue construido para permitir crecimiento incremental sin refactorizaciones grandes.

---

## Autor

Proyecto frontend desarrollado para la gestión administrativa de un sistema médico, siguiendo una arquitectura modular y una interfaz moderna orientada a usabilidad.
