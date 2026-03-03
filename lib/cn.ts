import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'bg-color': [
                {
                    bg: [
                        'background',
                        'surface',
                        'surface-hover',
                        'border',
                        'primary',
                        'primary-foreground',
                        'foreground',
                        'muted',
                        'warning',
                        'success',
                        'danger',
                    ],
                },
            ],
            'text-color': [
                {
                    text: [
                        'background',
                        'surface',
                        'primary',
                        'primary-foreground',
                        'foreground',
                        'muted',
                        'warning',
                        'success',
                        'danger',
                    ],
                },
            ],
            'border-color': [
                {
                    border: [
                        'background',
                        'surface',
                        'border',
                        'primary',
                        'foreground',
                        'muted',
                        'warning',
                        'success',
                        'danger',
                    ],
                },
            ],
        },
    },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
