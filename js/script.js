const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
      }
    });
  }, { threshold: 0.4 });

  // Seleciona todos os elementos que terão o efeito
  const elementos = document.querySelectorAll('main section, main div, footer');
  elementos.forEach((el) => observador.observe(el));