import { Dimensions, PixelRatio } from "react-native";

/**
 * Function that help to get responsive size for different sizes of screen
 * @param {number} size - some size that should be converted
 * @param {number} mockupWidth - optional property - mockup width; by default 375px
 * @returns {number} - responsive size
 */
export const getResponsiveSize = (
  size: number,
  mockupWidth: number = 375,
): number => {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get("window").width / mockupWidth) * size,
  );
};
