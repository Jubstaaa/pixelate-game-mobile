import React, { useMemo } from 'react'

import {
    Canvas,
    ColorMatrix,
    Image,
    RuntimeShader,
    useImage,
} from '@shopify/react-native-skia'
import { ActivityIndicator, View } from 'react-native'

import { COLORS } from '@/constants/colors'
import {
    computeBlockSize,
    GRAYSCALE_MATRIX,
    usePixelateShader,
} from '@/hooks/use-skia-pixelation'

import type { PixelatedImageProps } from './pixelated-image.types'

export const PixelatedImage = ({
    imageUrl,
    count,
    levelType,
    size = 320,
}: PixelatedImageProps) => {
    const image = useImage(imageUrl)
    const shader = usePixelateShader()

    const pixelSize = useMemo(
        () => computeBlockSize(count, levelType),
        [count, levelType]
    )

    const isFullyRevealed = count === 6

    if (!image) {
        return (
            <View
                className="items-center justify-center rounded-xl bg-surface"
                style={{ height: size, width: size }}>
                <ActivityIndicator color={COLORS.primary} size="large" />
            </View>
        )
    }

    return (
        <Canvas style={{ height: size, width: size }}>
            <Image
                fit="cover"
                height={size}
                image={image}
                width={size}
                x={0}
                y={0}>
                {isFullyRevealed && levelType === 1 ? (
                    <ColorMatrix matrix={GRAYSCALE_MATRIX} />
                ) : !isFullyRevealed ? (
                    <RuntimeShader source={shader} uniforms={{ pixelSize }}>
                        {levelType === 1 ? (
                            <ColorMatrix matrix={GRAYSCALE_MATRIX} />
                        ) : null}
                    </RuntimeShader>
                ) : null}
            </Image>
        </Canvas>
    )
}
