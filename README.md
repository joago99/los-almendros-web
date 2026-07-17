# Constructora Los Almendros — Sitio web

Landing page estática para Constructora Los Almendros.
Diseño editorial light premium, responsive, con animaciones suaves y formulario calificado.

## Stack

- HTML + CSS vanilla con Tailwind CDN
- Google Fonts: Inter + Playfair Display
- Formulario: Google Forms embebido
- Sin dependencias de build (CDN-only)

## Estado

- **URL:** https://constructoralosalmendros.cl
- **Hosting:** Hostinger (LiteSpeed, PHP 8.3)
- **DNS:** Cloudflare
- **Repo:** https://github.com/joago99/los-almendros-web

## Secciones

1. **Hero** — 12-columnas, carrusel con navegación prev/next + dots + autoplay
2. **Stats** — 4 indicadores (años, proyectos, regiones, compromiso)
3. **Proyectos** — grilla 3-col con cards animadas (hover zoom + elevación)
4. **Servicios** — Arquitectura, Construcción, Regularización con iconos SVG
5. **Nosotros** — foto residencial (sin nombres del equipo)
6. **Cotización** — formulario calificado (nombre, email, WhatsApp, servicio, avance, comuna, m², detalle)
7. **Footer** — enlaces, LinkedIn, WhatsApp, llms.txt, sitemap

## Diseño

- **Paleta:** blanco / piedra / negro / bordes sutiles
- **Tipografía:** Playfair Display (títulos) + Inter (cuerpo)
- **Animaciones:** fade-in al scroll, stagger en grillas, ripple en botones, hover elevación en cards
- **Responsive:** mobile-first, menú hamburguesa en móvil
- **Accesibilidad:** skip-link, aria-labels, prefers-reduced-motion

## Convenciones

- No hardcodear información personal del equipo en "Sobre Nosotros"
- Links y textos deben coincidir con `llms.txt` y `sitemap.xml`
- Botones siempre negro/blanco (sin ámbar/naranja en acciones principales)

## Deploy

El sitio se despliega a Hostinger. El FTP **no sincroniza** automáticamente con el storage que sirve PHP. Usar el **File Manager** del panel Hostinger para subir `index.html`.

### Si se rompe

```bash
git checkout main
cp index-v1-editorial.html index.html
git add index.html
git commit -m "release: <versión>"
git tag v1-backup-$(date +%Y-%m-%d)
git push origin main --tags
git push origin main
# Subir index.html desde File Manager de Hostinger a /public_html/
```

## Changelog

- `v2.0` (2026-07-17) — Editorial light premium. Nuevo diseño con animaciones, stats, formulario calificado, botón portal clientes. Hostinger production.
- `v2.x` — Versión anterior del sitio estático.
