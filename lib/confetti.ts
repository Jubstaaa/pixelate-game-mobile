// Confetti is triggered via a ref to the ConfettiCannon component
// This module exports a simple event emitter to trigger it from anywhere
type Listener = () => void

const listeners: Set<Listener> = new Set()

export function onConfetti(cb: Listener) {
    listeners.add(cb)
    return () => listeners.delete(cb)
}

export function triggerConfetti() {
    listeners.forEach(cb => cb())
}
