import { COMPONENTS } from './../constants/constant';

const checkForDomVisibility = () => {
    var lazyModules = [].slice.call(document.querySelectorAll(COMPONENTS.join()));
    if ("IntersectionObserver" in window) {
      let lazyModuleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(function(entry) {
          console.log(entry);
          if (entry.isIntersecting) {
            switch (entry.target.tagName.toLowerCase()) {
                case "second-component":
                    import('./../components/second/second-component').then(module => {
                        lazyModuleObserver.unobserve(entry.target);
                      })
                    break;
                default:
                    break;
            }
          }
        });
      });
    
      lazyModules.forEach(function(module) {
        lazyModuleObserver.observe(module);
      });
    } else {
      // Possibly fall back to event handlers here
    }
}

checkForDomVisibility();