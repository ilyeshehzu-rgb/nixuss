/* ==========================================================================
   NIXUSS — Script principal
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Surlignage du lien de navigation actif au défilement ---
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const isActive = link.getAttribute("href") === `#${entry.target.id}`;
              link.classList.toggle("is-active", isActive);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // --- Garde-fou du formulaire tant que l'endpoint n'est pas branché ---
  const leadForm = document.querySelector(".lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
      if (!leadForm.getAttribute("action")) {
        event.preventDefault();
        // TODO : brancher l'endpoint Formspree / Netlify Forms dans l'attribut action.
        window.alert(
          "Merci ! Le formulaire sera bientôt connecté. Contactez-nous en attendant à contact@nixuss.com."
        );
      }
    });
  }
});
