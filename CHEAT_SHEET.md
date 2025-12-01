# Harvard Theme - Cheat Sheet

## 🎨 COLORES

### Texto
```tsx
text-heading      // #1E1E1E - Títulos
text-body         // #414141 - Párrafos
text-subtle       // #6C6C6C - Sutil
text-link         // #0579B8 - Links
```

### Fondos de Marca
```tsx
bg-brand-blue      // #0579B8 - Estudiantes
bg-brand-crimson   // #A51C30 - Institucional
bg-brand-slate     // #3E6F7D - Colecciones
bg-brand-yellow    // #F8C21C - Servicios/Fechas
```

### Fondos Neutros
```tsx
bg-white
bg-background-light    // #F9F9F9
bg-background-lighter  // #F3F3F3
```

### Bordes
```tsx
border-border          // #C0C0C0 - Divisores
border-brand-blue      // Categoría
border-brand-slate     // Categoría
border-brand-yellow    // Categoría
border-brand-crimson   // Categoría
```

---

## 🔘 BOTONES

```tsx
<button className="btn-primary">Azul</button>
<button className="btn-secondary">Crimson</button>
<button className="btn-accent">Amarillo</button>

// Como Link
<Link href="/" className="btn-primary">Link Button</Link>
```

---

## 🔗 LINKS

```tsx
import Link from 'next/link';

// Link estándar
<Link href="/page" className="text-link">Link</Link>

// Link sutil
<Link href="/page" className="text-subtle hover:text-link">Link</Link>

// Link navbar
<Link href="/page" className="text-link font-trueno font-semibold uppercase text-sm">
  NAV LINK
</Link>
```

---

## 📦 CARDS

```tsx
// Card básica
<div className="card-harvard">
  <h4>Title</h4>
  <p className="text-small">Text</p>
</div>

// Card con categoría (borde izquierdo)
<div className="card-harvard border-l-4 border-brand-blue">
  <h4>Student Resources</h4>
</div>
```

---

## 🎭 GRADIENTE

**SOLO un gradiente:** Crimson → Red

```tsx
// 135deg diagonal (recomendado)
<section style={{
  background: 'linear-gradient(135deg, var(--color-brand-crimson) 0%, var(--color-brand-red) 100%)'
}}>
```

**Dónde usar:**
- ✅ Heroes grandes
- ✅ Call-to-action sections
- ❌ Botones
- ❌ Texto
- ❌ Cards pequeñas

---

## 📝 TIPOGRAFÍA

### Headers (automático)
```tsx
<h1>H1 - Trueno Bold 60px/32px</h1>
<h2>H2 - Trueno Bold 32px/24px</h2>
<h3>H3 - Trueno Bold 20px</h3>
<h4>H4 - Trueno SemiBold 20px</h4>
```

### Utilidades
```tsx
<p className="subtitle">Lora Italic 26px/22px</p>
<p className="text-supporting-lg">Trueno Light 25px/22px</p>
<p className="text-small">Lora 15px</p>

// Override uppercase (headers son uppercase por defecto)
<h3 className="normal-case">Not Uppercase</h3>
```

---

## 🏷️ BADGES

```tsx
// Fecha/hora (amarillo)
<span className="bg-brand-yellow text-heading px-3 py-1 rounded-full text-sm font-semibold">
  Due: Dec 15
</span>

// Categoría (azul)
<span className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
  Students
</span>
```

---

## 📐 LAYOUT

```tsx
// Container Harvard (max 1410px)
<div className="container-harvard">...</div>

// Grid 12 columnas
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 lg:col-span-8">Main</div>
  <div className="col-span-12 lg:col-span-4">Sidebar</div>
</div>

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

---

## 🎯 CASOS DE USO RÁPIDOS

### Hero Section
```tsx
<section 
  style={{ background: 'linear-gradient(135deg, var(--color-brand-crimson), var(--color-brand-red))' }}
  className="py-24"
>
  <div className="container-harvard">
    <h1 className="text-white">Title</h1>
    <button className="btn-accent mt-8">CTA</button>
  </div>
</section>
```

### Navbar
```tsx
<nav className="bg-white border-b border-border">
  <div className="container-harvard">
    <div className="flex items-center justify-between h-16">
      <Link href="/" className="text-brand-crimson font-bold">HARVARD LIBRARY</Link>
      <Link href="/page" className="text-link font-semibold uppercase text-sm">LINK</Link>
      <button className="btn-primary text-sm py-2 px-4">CTA</button>
    </div>
  </div>
</nav>
```

### Card con Link
```tsx
<div className="card-harvard border-l-4 border-brand-blue">
  <span className="bg-brand-blue text-white px-2 py-1 rounded-full text-xs">Badge</span>
  <h4 className="normal-case mt-3">Title</h4>
  <p className="text-small text-body mt-2">Description</p>
  <Link href="/page" className="text-link mt-4 inline-block font-semibold">
    Learn More →
  </Link>
</div>
```

---

## ⚠️ NO HACER

```tsx
// ❌ NO: Color de marca en texto normal
<p className="text-brand-blue">Wrong</p>

// ✅ SÍ: Usa text-body o text-heading
<p className="text-body">Correct</p>

// ❌ NO: bg-brand-red solo
<div className="bg-brand-red">Wrong</div>

// ✅ SÍ: Solo en gradientes
<div style={{ background: 'linear-gradient(...)' }}>Correct</div>

// ❌ NO: Olvidar text-link en Links
<Link href="/">Wrong</Link>

// ✅ SÍ: Siempre usa text-link
<Link href="/" className="text-link">Correct</Link>
```

---

## 🎨 MATRIZ DE COLORES POR COMPONENTE

| Componente | Estudiantes | Colecciones | Servicios | Institucional |
|------------|-------------|-------------|-----------|---------------|
| **Borde** | `border-brand-blue` | `border-brand-slate` | `border-brand-yellow` | `border-brand-crimson` |
| **Badge** | `bg-brand-blue text-white` | `bg-brand-slate text-white` | `bg-brand-yellow text-heading` | `bg-brand-crimson text-white` |
| **Fondo** | `bg-brand-blue text-white` | `bg-brand-slate text-white` | `bg-brand-yellow text-heading` | `bg-brand-crimson text-white` |

---

## 📱 BREAKPOINTS

```tsx
sm:   // 600px
md:   // 768px
lg:   // 1024px
xl:   // 1280px
2xl:  // 1536px

// Ejemplo
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

**Guía Completa:** Ver `HARVARD_THEME_GUIDE.md`