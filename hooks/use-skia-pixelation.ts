import { useMemo } from 'react'

import { Skia } from '@shopify/react-native-skia'

const PIXELATE_SHADER_SRC = `
  uniform shader image;
  uniform float pixelSize;

  half4 main(float2 xy) {
    float2 snapped = floor(xy / pixelSize) * pixelSize + pixelSize * 0.5;
    return image.eval(snapped);
  }
`

export const GRAYSCALE_MATRIX = [
    0.333, 0.333, 0.333, 0, 0, 0.333, 0.333, 0.333, 0, 0, 0.333, 0.333, 0.333,
    0, 0, 0, 0, 0, 1, 0,
]

export const computeBlockSize = (count: number, levelType: number, size: number = 400): number => {
    const maxBlockSize = levelType === 1 ? 32 : 80
    const minBlockSize = 1
    const webBlockSize = Math.max(
        minBlockSize,
        maxBlockSize - Math.floor((count / 6) * (maxBlockSize - minBlockSize))
    )
    return Math.max(1, Math.round(webBlockSize * (size / 400)))
}

export const usePixelateShader = () =>
    useMemo(() => {
        const effect = Skia.RuntimeEffect.Make(PIXELATE_SHADER_SRC)
        if (!effect) throw new Error('Failed to compile pixelation shader')
        return effect
    }, [])
