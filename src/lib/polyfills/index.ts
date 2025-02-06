// Import core-js features
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Polyfill for Safari
if (!window.globalThis) {
    (window as any).globalThis = window;
}

// Polyfill for older browsers
if (!Object.fromEntries) {
    Object.fromEntries = function (entries: any) {
        return [...entries].reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    };
}

// Polyfill for smooth scrolling
if (!('scrollBehavior' in document.documentElement.style)) {
    import('scroll-behavior-polyfill').then(() => {
        console.log('Smooth scroll polyfill loaded');
    });
}

// Polyfill for IntersectionObserver
if (!('IntersectionObserver' in window)) {
    import('intersection-observer').then(() => {
        console.log('IntersectionObserver polyfill loaded');
    });
}

// Add error logging
const originalConsoleError = console.error;
console.error = function(...args) {
    // Log to original console
    originalConsoleError.apply(this, args);
    
    // Save error to localStorage for debugging
    try {
        const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
        errors.push({
            timestamp: new Date().toISOString(),
            error: args.map(arg => 
                arg instanceof Error 
                    ? { message: arg.message, stack: arg.stack }
                    : arg
            )
        });
        localStorage.setItem('app_errors', JSON.stringify(errors.slice(-50))); // Keep last 50 errors
    } catch (e) {
        originalConsoleError('Error saving to localStorage:', e);
    }
};
