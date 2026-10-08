// IntersectionObserver to handle scroll animations.
// Elements animate in once and stay visible, so scrolling back up doesn't hide them.

const animatedScrollObserver = new IntersectionObserver(
    ( entries, observer ) =>
    {
        entries.forEach( ( entry ) =>
        {
            if ( entry.isIntersecting )
            {
                entry.target.classList.add( entry.target.dataset.animationType || 'fade' );
                observer.unobserve( entry.target );
            }
        } );
    },
    { threshold: 0.12 }
);

export default {
    bind( el, binding )
    {
        const animationType = binding.value;
        el.classList.add( `before-${ animationType }` );
        el.dataset.animationType = animationType;
        animatedScrollObserver.observe( el );
    },
};
