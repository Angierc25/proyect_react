
# ChatNow 🗨️

**ChatNow** es una aplicación web de publicaciones comunitarias construida con **React**, **TypeScript**, **Supabase** y **Vite**. Permite a los usuarios explorar comunidades, ver publicaciones y compartir contenido en tiempo real.

## 🚀 Tecnologías utilizadas

- ⚛️ **React** – para la interfaz de usuario dinámica
- 🟦 **TypeScript** – para tipado estático robusto
- ⚡ **Vite** – para desarrollo y construcción ultrarrápida
- 🧾 **Supabase** – como backend (base de datos, autenticación y almacenamiento)
- 🔁 **React Query** – para manejo eficiente de datos asincrónicos
- 🎨 **Tailwind CSS** – para estilos rápidos y modernos

## 📂 Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables como PostItem, CommunityDisplay
├── pages/             # Vistas principales
├── supabase-client.ts # Configuración de Supabase
├── App.tsx            # Root de la aplicación
└── main.tsx           # Punto de entrada
```

## 🧠 Funcionalidades principales

- 🏘️ Listado de comunidades
- 📝 Publicaciones por comunidad
- 📸 Soporte para imágenes en los posts
- ⚠️ Mensaje de “sin publicaciones” si no hay contenido aún
- ⏱️ Orden cronológico (más recientes primero)
- 🔐 Autenticación con Supabase (próximamente)

## 🛠️ Instalación y ejecución local

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/chatnow.git
cd chatnow

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## ✅ Reglas de ESLint recomendadas (opcional)

Si estás trabajando en producción, puedes habilitar reglas estrictas y específicas para React:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```



## 🧑‍💻 Autor

- Desarrollado por [Angie Carhuas](https://github.com/Angierc25)

---

¡Explora, comparte y conecta en ChatNow!
