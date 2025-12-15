// Router para manejar la navegación SPA
class Router {
  constructor() {
    this.contentElement = document.getElementById("app-content");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn");
    this.mobileMenu = document.getElementById("mobile-menu");

    // Mapeo de páginas a archivos
    this.pageFiles = {
      inicio: "pages/Inicio.html",
      "sobre-mi": "pages/SobreMi.html",
      experiencia: "pages/Experiencia.html",
      educacion: "pages/Educacion.html",
      portafolio: "pages/Portafolio.html",
      contacto: "pages/Contacto.html",
    };

    this.init();
  }

  init() {
    // Cargar página inicial
    this.loadPage("inicio");

    // Escuchar clicks en los enlaces de navegación
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        this.navigate(page);

        // Cerrar menú móvil si está abierto
        this.mobileMenu.classList.add("hidden");
      });
    });

    // Manejar botón de menú móvil
    this.mobileMenuBtn.addEventListener("click", () => {
      this.mobileMenu.classList.toggle("hidden");
    });

    // Manejar navegación con botones del navegador
    window.addEventListener("popstate", (e) => {
      const page = e.state?.page || "inicio";
      this.loadPage(page, false);
    });
  }

  navigate(page) {
    this.loadPage(page);

    // Actualizar URL sin recargar la página
    const url = page === "inicio" ? "/" : `#${page}`;
    history.pushState({ page }, "", url);
  }

  async loadPage(page, updateHistory = true) {
    // Obtener ruta del archivo
    const pageFile = this.pageFiles[page] || this.pageFiles["inicio"];

    try {
      // Animar salida
      this.contentElement.style.opacity = "0";

      // Cargar contenido del archivo HTML
      const response = await fetch(pageFile);

      if (!response.ok) {
        throw new Error(`Error al cargar ${pageFile}`);
      }

      const content = await response.text();

      // Animar entrada después de un breve delay
      setTimeout(() => {
        this.contentElement.innerHTML = content;
        this.contentElement.style.opacity = "1";

        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Actualizar enlaces activos
        this.updateActiveLink(page);

        // Re-bind event listeners para enlaces dentro del contenido cargado
        this.bindContentLinks();
      }, 150);
    } catch (error) {
      console.error("Error cargando página:", error);
      this.contentElement.innerHTML = `
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div class="flex flex-col gap-6 px-4 py-10 text-center">
            <h1 class="text-red-500 text-2xl font-bold">Error al cargar la página</h1>
            <p class="text-gray-600 dark:text-gray-400">No se pudo cargar el contenido de ${page}</p>
          </div>
        </div>
      `;
      this.contentElement.style.opacity = "1";
    }
  }

  bindContentLinks() {
    // Buscar todos los enlaces con clase nav-link dentro del contenido cargado
    const contentLinks = this.contentElement.querySelectorAll(".nav-link");

    contentLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
          this.navigate(page);
        }
      });
    });
  }

  updateActiveLink(page) {
    this.navLinks.forEach((link) => {
      if (link.getAttribute("data-page") === page) {
        link.classList.add("text-primary");
        link.classList.remove("dark:text-gray-300");
      } else {
        link.classList.remove("text-primary");
        link.classList.add("dark:text-gray-300");
      }
    });
  }
}

// Inicializar router cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new Router();

  // Agregar transición suave al contenido
  const content = document.getElementById("app-content");
  content.style.transition = "opacity 0.15s ease-in-out";
});
