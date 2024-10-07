import { MutableRefObject, useEffect, useRef } from "react";

function useScroll(
    parentRef: MutableRefObject<HTMLElement | null>,
    childrenRef: MutableRefObject<HTMLElement | null>,
    cb: () => void
): void {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const parentElement = parentRef.current;
        const childrenElement = childrenRef.current;
        if (!parentElement || !childrenElement) return;

        const options = {
            root: parentElement,
            rootMargin: "0px",
            threshold: 0,
        };

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                cb();
            }
        }, options);

        observer.current.observe(childrenElement);

        return () => {
            if (observer.current && childrenElement) {
                observer.current.unobserve(childrenElement); // Прекращаем наблюдение при размонтировании
            }
        }
    }, [cb, parentRef, childrenRef])

}

export default useScroll;