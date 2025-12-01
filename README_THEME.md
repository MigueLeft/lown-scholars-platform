# Harvard Library Theme - Instalación

## **Archivos del Theme**

1. **`globals.css`** - Configuración completa del theme para Tailwind CSS v4
2. **`HARVARD_THEME_GUIDE.md`** - Guía completa de uso con ejemplos

---

## **Instalación Rápida**

### **1. Copiar globals.css**

Reemplaza tu archivo `src/app/globals.css` con el archivo `globals.css` proporcionado.

### **2. Descargar Fuentes**

Descarga las fuentes y colócalas en `public/fonts/`:

**Trueno:** https://fontlibrary.org/en/font/trueno
```
public/fonts/trueno/
├── Trueno-Bold.otf
├── Trueno-SemiBold.otf
├── Trueno-Regular.otf
├── Trueno-Light.otf
└── Trueno-UltraLight.otf
```

**Lora:** https://fonts.google.com/specimen/Lora
```
public/fonts/lora/
├── Lora-Regular.ttf
├── Lora-Bold.ttf
├── Lora-Italic.ttf
└── Lora-BoldItalic.ttf
```

### **3. Verificar Instalación**

Crea una página de prueba:

```tsx
// src/app/test/page.tsx
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="container-harvard py-12">
      <h1>Theme Test</h1>
      
      {/* Test colors */}
      <div className="flex gap-4 mt-8">
        <div className="bg-brand-blue h-20 w-20 rounded"></div>
        <div className="bg-brand-crimson h-20 w-20 rounded"></div>
        <div className="bg-brand-slate h-20 w-20 rounded"></div>
        <div className="bg-brand-yellow h-20 w-20 rounded"></div>
      </div>
      
      {/* Test typography */}
      <h2 className="mt-8">Heading 2</h2>
      <p className="text-body mt-4">Body text with Lora font.</p>
      <Link href="/" className="text-link mt-4 inline-block">Test Link</Link>
      
      {/* Test buttons */}
      <div className="flex gap-4 mt-8">
        <button className="btn-primary">Primary</button>
        <button className="btn-secondary">Secondary</button>
        <button className="btn-accent">Accent</button>
      </div>
      
      {/* Test card */}
      <div className="card-harvard border-l-4 border-brand-blue mt-8 max-w-md">
        <h4 className="normal-case">Card Title</h4>
        <p className="text-small mt-2">Card description text.</p>
      </div>
    </div>
  );
}
```

Visita `http://localhost:3000/test` para verificar que todo funciona.

---

## **Clases Principales**

### **Texto:**
```tsx
text-heading    // Títulos (#1E1E1E)
text-body       // Párrafos (#414141)
text-subtle     // Texto sutil (#6C6C6C)
text-link       // Links (azul Harvard)
```

### **Botones:**
```tsx
btn-primary     // Azul
btn-secondary   // Crimson
btn-accent      // Amarillo
```

### **Fondos:**
```tsx
bg-brand-blue
bg-brand-crimson
bg-brand-slate
bg-brand-yellow
bg-background-light     // #F9F9F9
bg-background-lighter   // #F3F3F3
```

### **Componentes:**
```tsx
card-harvard           // Card básica
container-harvard      // Container 1410px
subtitle               // Subtitle con Lora italic
text-small            // Texto pequeño
text-supporting-lg    // Texto grande de apoyo
```

---

## **Gradiente Oficial**

Solo hay UN gradiente permitido: **Crimson → Red**

```tsx
<section 
  style={{
    background: 'linear-gradient(135deg, var(--color-brand-crimson) 0%, var(--color-brand-red) 100%)'
  }}
>
  {/* Contenido */}
</section>
```

---

## **Uso con Next.js Link**

SIEMPRE usa `text-link` en componentes Link:

```tsx
import Link from 'next/link';

<Link href="/page" className="text-link">
  Link Text
</Link>
```

---

## **Recursos**

- **Guía Completa:** Lee `HARVARD_THEME_GUIDE.md` para ejemplos detallados
- **Brand Guidelines:** https://library.harvard.edu/brand-guidelines
- **Soporte:** harvard_library@harvard.edu

---

## **Integración con Material UI**

Si usas Material UI, el theme ya está configurado con las capas correctas:

```css
@layer theme, base, mui, components, utilities;
```

Esto permite que Tailwind sobrescriba los estilos de MUI cuando sea necesario.

---

## **Troubleshooting**

### **Las fuentes no cargan:**
- Verifica que las fuentes estén en `public/fonts/`
- Revisa la consola del navegador
- Asegúrate de que las rutas en `@font-face` sean correctas

### **Los colores no funcionan:**
- Verifica que hayas copiado el archivo `globals.css` completo
- Asegúrate de usar Tailwind CSS v4
- Limpia el caché: `npm run dev` (reinicia el servidor)

### **Los botones no se ven:**
- Los botones usan `display: inline-block` por defecto
- Agrega clases de Tailwind para ajustar si es necesario

---

**Última actualización:** Noviembre 2024