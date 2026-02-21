export function getImageDimensions(actualDims: {width: number, height: number}, desiredDims: {maxWidth: number, maxHeight: number}): {width: number, height: number} {
    const aspectRatio = actualDims.width / actualDims.height;

    function widthBased (): {width: number, height: number} {
        return actualDims;
    }

    function heightBased(): {width: number, height: number} {
        return actualDims;
    }

    return actualDims;
}