
import { useEffect } from 'react';

export function useDismissable(isOpen, onDismiss, containerRef, { lockScroll = true } = {}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = event => {
      if (event.key === 'Escape') onDismiss();
    };

    // `pointerdown` rather than `click`: a click fires after the pointer is
    // released, so a visitor who presses outside and drags back in would still
    // dismiss. pointerdown also beats the React onClick that opened the sheet
    // to the punch, which is why the toggle has to be inside containerRef —
    // otherwise opening it would immediately register as an outside press.
    const onPointerDown = event => {
      if (!containerRef.current?.contains(event.target)) onDismiss();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    // Capture what was there so the cleanup restores it instead of clearing to
    // '' — the latter would discard a value set elsewhere.
    const root = document.documentElement;
    const previousOverflow = lockScroll ? root.style.overflow : null;
    if (lockScroll) root.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      if (lockScroll) root.style.overflow = previousOverflow;
    };
  }, [isOpen, onDismiss, containerRef, lockScroll]);
}

export default useDismissable;
