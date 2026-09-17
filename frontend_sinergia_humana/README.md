# Talent AI — Frontend

Plataforma inteligente de evaluación de talento humano para una institución financiera.
Este repositorio contiene **únicamente el frontend**, construido con datos **mock**
y una arquitectura desacoplada, lista para conectarse a una futura API en
**Django REST Framework** sin modificar los componentes visuales.

---

## 1. ¿Qué Sinergia Humana?

Sinergia Humana permite a un equipo de RRHH:

- Gestionar convocatorias laborales (jobs) y cargos.
- Registrar candidatos y cargar su CV en PDF.
- Simular la extracción y evaluación automática del CV frente a una convocatoria
  (motor determinístico + análisis semántico asistido por IA).
- Comparar candidatos contra empleados de referencia / alto desempeño.
- Visualizar score final, fortalezas, brechas, recomendación y ranking.

Toda la lógica de evaluación real (motor Python + LLM) vivirá en el backend.
Este frontend simula ese comportamiento con **mock services** que implementan
la misma interfaz que tendrán los servicios reales.

---

## 2. Arquitectura

```
src/
├── app/
│   ├── router/          # Definición de rutas + ProtectedRoute
│   ├── providers/        # AuthProvider, QueryProvider
│   └── App.tsx
├── components/
│   ├── ui/               # Button, Input, Modal, DataTable, ScoreRing, etc.
│   ├── layout/            # Header, Sidebar, DashboardLayout, partículas
│   └── charts/            # Gráficos Recharts (dashboard, radar)
├── features/              # Una carpeta por módulo de negocio
│   ├── auth/ dashboard/ jobs/ candidates/ cv/ evaluations/
│   ├── rankings/ employees/ users/ ai/ settings/
├── services/
│   ├── api/               # Interfaces de servicio (auth, jobs, candidates, ...)
│   ├── mock/               # Datos y lógica mock (usadas cuando VITE_USE_MOCKS=true)
│   └── http/                # Cliente Axios centralizado
├── hooks/                  # Hooks de TanStack Query — única puerta a los servicios
├── schemas/                 # Validaciones Zod (login, jobs, candidatos, usuarios)
├── types/                    # Tipos TypeScript del dominio
└── config/                    # Lectura de variables de entorno (env.ts)
```

### Principio clave: backend desacoplado

Ningún componente llama a Axios directamente. El flujo siempre es:

```
componente → hook (TanStack Query) → service (services/api) → mock o Axios
```

Cada servicio (`jobService`, `candidateService`, `evaluationService`, etc.)
expone una interfaz TypeScript (`IJobService`, `ICandidateService`, ...) y
selecciona su implementación según `VITE_USE_MOCKS`:

```ts
export const jobService: IJobService = env.useMocks ? mockJobService : realJobService;
```

Cuando el backend Django esté listo, basta con cambiar `VITE_USE_MOCKS=false`
en `.env` (y ajustar `VITE_API_BASE_URL`) — los componentes no cambian.

---

## 3. Tecnologías

- React 18 + TypeScript + Vite
- React Router 6
- Tailwind CSS (paleta institucional azul)
- TanStack Query (server state)
- Axios (cliente HTTP, listo para Django)
- React Hook Form + Zod (formularios y validación)
- Recharts (gráficos y radar de comparación)
- Lucide React (iconografía)

---

## 4. Instalación y ejecución

> **Nota:** este proyecto fue generado en un entorno sin acceso a red, por lo
> que las dependencias **no han sido instaladas ni el build ha sido verificado**
> aquí. Al descomprimir el proyecto en tu máquina, sigue estos pasos:

```bash
npm install
cp .env.example .env   # ya viene incluido un .env con valores por defecto
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

### Build de producción

```bash
npm run build
npm run preview
```

Si `tsc -b` reporta errores de tipos al primer intento, revisa que todas las
dependencias en `package.json` se hayan instalado correctamente (algunas
versiones pueden requerir ajustes menores según el gestor de paquetes usado).

### Credenciales de demo

```
Email:    admin@talentai.local
Password: 12345678
```

---

## 5. Variables de entorno

| Variable              | Descripción                                             | Default                        |
|-----------------------|----------------------------------------------------------|---------------------------------|
| `VITE_USE_MOCKS`      | `true` usa mock services; `false` usa Axios contra Django | `true`                          |
| `VITE_API_BASE_URL`   | Base URL de la API Django REST Framework                 | `http://localhost:8000/api`     |
| `VITE_MOCK_DELAY_MS`  | Latencia simulada de los mocks (ms)                       | `600`                           |

> Importante: Vite "hornea" las variables `VITE_*` en tiempo de **build**, no
> en runtime. Si cambias `VITE_USE_MOCKS`, necesitas volver a ejecutar
> `npm run build` (o reiniciar `npm run dev`).

---

## 6. Módulos implementados y rutas

| Ruta                     | Módulo                                              |
|--------------------------|------------------------------------------------------|
| `/login`                 | Login (mock, sin JWT real todavía)                   |
| `/dashboard`             | KPIs, gráficos, Top Talent, AI Insights              |
| `/jobs`, `/jobs/:id`     | Convocatorias (lista, creación, detalle)             |
| `/candidates`            | Lista de candidatos con filtros                      |
| `/candidates/new`        | Flujo: convocatoria → datos → carga de CV → análisis |
| `/evaluations`           | Historial de evaluaciones                            |
| `/evaluations/:candidateId` | Resultado de evaluación (score, breakdown, AI)   |
| `/rankings`              | Ranking + radar candidato vs empleados de referencia |
| `/employees`             | Empleados de referencia / high performers            |
| `/users`                 | Usuarios internos (ADMIN / RECRUITER)                |
| `/ai-insights`           | Skill gaps, tendencias, disponibilidad de talento    |
| `/settings`              | Perfil del usuario actual y entorno                  |

---

## 7. Mock data

Se incluyen datos ficticios realistas en `src/services/mock/data/`:

- 10 empleados de referencia (varios marcados como *High Performer*)
- 10 candidatos con scores distribuidos (95, 92, 89, 84, 78, 72, 65, 58, 45, 32)
- 4 convocatorias (activas, cerrada y en borrador)
- 10 evaluaciones con breakdown, fortalezas, brechas y análisis de IA
- 2 usuarios internos (admin y reclutador)

---

## 8. Qué partes usan mocks hoy

**Todo** el acceso a datos pasa hoy por `services/mock/*` porque
`VITE_USE_MOCKS=true` por defecto. Esto incluye login, CRUD de convocatorias,
candidatos, carga de CV (simulada, sin persistencia real de archivo), el
"análisis" de IA (genera un score y evaluación de forma determinística/aleatoria
en el cliente) y los agregados del dashboard / AI Insights.

---

## 9. Endpoints Django que se espera consumir a futuro

```
AUTH
POST   /api/auth/login/
GET    /api/auth/me/

USERS
GET    /api/users/        POST /api/users/
GET    /api/users/:id/    PATCH /api/users/:id/    DELETE /api/users/:id/

JOBS
GET    /api/jobs/         POST /api/jobs/
GET    /api/jobs/:id/     PATCH /api/jobs/:id/     DELETE /api/jobs/:id/

EMPLOYEES
GET    /api/employees/    GET /api/employees/:id/

CANDIDATES
GET    /api/candidates/   POST /api/candidates/    GET /api/candidates/:id/
POST   /api/candidates/:id/cv/     (multipart/form-data)

EVALUATIONS
GET    /api/evaluations/  POST /api/evaluations/   GET /api/evaluations/:id/

RANKINGS
GET    /api/rankings/

AI
POST   /api/ai/analyze/
```

Los servicios reales (`realJobService`, `realCandidateService`, etc.) ya están
escritos en cada archivo de `services/api/*.ts`, comentados junto a su
contraparte mock, listos para activarse con `VITE_USE_MOCKS=false`.

---

## 10. Docker

```bash
docker compose up --build
```

Esto construye el frontend (build de producción) y lo sirve con nginx en
`http://localhost:8080`. Nota: como las variables `VITE_*` se hornean en build,
si necesitas apuntar a un backend real debes definir `VITE_API_BASE_URL` y
`VITE_USE_MOCKS=false` antes del build (por ejemplo como build args), no solo
como variable de entorno del contenedor en runtime.

---

## 11. Próximos pasos sugeridos

1. Instalar dependencias y correr `npm run build` para confirmar que todo
   compila sin errores de TypeScript en tu entorno (aquí no fue posible por
   falta de acceso a red).
2. Implementar el backend Django REST Framework siguiendo los contratos de
   endpoints listados arriba.
3. Cambiar `VITE_USE_MOCKS=false` y `VITE_API_BASE_URL` cuando el backend esté
   disponible.
4. Implementar autenticación JWT real (el `apiClient` ya tiene el interceptor
   de request listo para adjuntar el token).
