document.addEventListener('DOMContentLoaded', () => {
    
    
    const progressBar = document.getElementById('scroll-progress');
    
    const updateProgressBar = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        requestAnimationFrame(() => {
            progressBar.style.width = `${scrollPercent}%`;
        });
    };

    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('scroll', updateProgressBar);

    
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null, 
        threshold: 0.15, 
        rootMargin: "0px" 
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
});