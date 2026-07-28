# Autoescola Filló — Web Next.js

Nueva web de [autoescolafillo.com](https://autoescolafillo.com/) con React + Next.js, chat de IA y panel de administración.

## Arranque

```bash
npm install
npm run dev
```

- Web pública: http://localhost:3000
- Admin: http://localhost:3000/admin
- Contraseña por defecto: `fillo2026` (cámbiala en `.env.local`)

## Variables de entorno

Copia `.env.local` y ajusta:

- `ADMIN_PASSWORD` — acceso al panel
- `ADMIN_SECRET` — firma de la sesión
- `OPENAI_API_KEY` — opcional; si no está, el chat responde con la base de conocimiento de la autoescuela (FAQ, tarifas, horarios)

## Panel admin

- **Dashboard**: visitas, leads, chat
- **Estadísticas**: gráficos de 7 días y páginas vistas
- **Leads**: gestionar consultas de formularios
- **Tarifas**: subir/bajar precios de coche, moto y AM
- **Textos**: editar contenidos principales
- **Imágenes**: subir y asignar a secciones

Los datos se guardan en `/data` (JSON) y las subidas en `/public/uploads`.
