# Fomento Digital Component / Economía Digital Integrador

![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-black?style=for-the-badge&logo=framer)

Bienvenido al repositorio del proyecto **Fomento Digital**. Esta es una aplicación web moderna construida con React y Vite, diseñada para promover la economía digital, el emprendimiento y la innovación en Ecuador.

## 🚀 Características Principales

*   **Diseño Moderno y Responsivo**: Interfaz de usuario pulida utilizando Tailwind CSS y gradientes fluidos.
*   **Animaciones Avanzadas**: Transiciones suaves y efectos visuales con Framer Motion.
*   **Elementos 3D**: Integración de gráficos 3D ligeros utilizando `@react-three/fiber`.
*   **Navegación Intuitiva**: Enrutamiento SPA con `react-router-dom`.
*   **Formularios Interactivos**: Integración de formularios para brigadas y talleres (WhatsApp Business).
*   **Rendimiento Optimizado**: Build ultrarrápido gracias a Vite.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

*   **Node.js**: Versión 18.0.0 o superior recomendada.
*   **npm** (incluido con Node.js) o **yarn**.
*   **Git**: Para clonar el repositorio.

## 📥 Instalación y Configuración

Sigue estos pasos para obtener una copia local del proyecto y ponerlo en marcha.

### 1. Clonar el repositorio

Abre tu terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/j03l1725/Econom-aDigitalIntegrador.git
cd Econom-aDigitalIntegrador
```

*(Nota: Asegúrate de estar en el directorio raíz del proyecto después de clonar)*

### 2. Instalar dependencias

Instala todas las librerías necesarias ejecutando:

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

Para iniciar la aplicación en modo local:

```bash
npm run dev
```

La aplicación estará disponible típicamente en `http://localhost:5173`.

---

## 📂 Estructura del Proyecto

La estructura de carpetas está organizada para facilitar la escalabilidad:

```
src/
├── components/        # Componentes reutilizables (Botones, Tarjetas, Secciones)
│   ├── ui/            # Elementos de UI base (Partículas, Gradientes)
│   ├── Navbar.jsx     # Barra de navegación principal
│   ├── Hero.jsx       # Sección principal de la página de inicio
│   └── ...
├── pages/             # Páginas principales de la aplicación
│   ├── HomePage.jsx       # Página de inicio
│   ├── BrigadasPage.jsx   # Página de registro de Brigadas
│   ├── DiagnosisPage.jsx  # Página de Diagnóstico
│   └── WhatsAppPage.jsx   # Página de Taller WhatsApp
├── lib/               # Utilidades y funciones auxiliares (utils.js)
├── index.css          # Estilos globales y configuración de Tailwind
├── App.jsx            # Configuración de rutas y layout principal
└── main.jsx           # Punto de entrada de la aplicación
```

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

*   `npm run dev`: Inicia el servidor de desarrollo.
*   `npm run build`: Construye la aplicación para producción en la carpeta `dist`.
*   `npm run preview`: Previsualiza la build de producción localmente.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores.

## 🎨 Tecnologías Utilizadas

*   **[React 19](https://react.dev/)**: Biblioteca para interfaces de usuario.
*   **[Vite](https://vitejs.dev/)**: Entorno de desarrollo frontend de próxima generación.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades CSS.
*   **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca de animaciones lista para producción.
*   **[Lucide React](https://lucide.dev/)**: Iconos flexibles y ligeros.
*   **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**: Renderizado 3D en React.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu nueva funcionalidad (`git checkout -b feature/NuevaFuncionalidad`).
3.  Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4.  Haz push a la rama (`git push origin feature/NuevaFuncionalidad`).
5.  Abre un Pull Request.

---

Hecho con ❤️ para el Fomento Digital del Ecuador.
