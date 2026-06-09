import { useEffect, useRef } from "react";

/**
 * In-memory cache:
 * key -> dataURL of processed canvas
 */
const canvasCache = new Map<string, string>();

interface CanvasLogoProps {
    src: string;
    size?: number;
    invert?: boolean;
    brightness?: number;
    className?: string;
}

export function CanvasLogo({
    src,
    size = 28,
    invert = false,
    brightness = 1,
    className,
}: CanvasLogoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!src) return;

        const cacheKey = `${src}|${size}|${invert}|${brightness}`;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // ✅ 1. If cached → skip processing
        const cached = canvasCache.get(cacheKey);
        if (cached) {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, size, size);
                ctx.drawImage(img, 0, 0, size, size);
            };
            img.src = cached;
            return;
        }

        // ✅ 2. Otherwise process image
        const img = new window.Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            ctx.clearRect(0, 0, size, size);

            const scale = Math.min(size / img.width, size / img.height);
            const width = img.width * scale;
            const height = img.height * scale;

            const x = (size - width) / 2;
            const y = (size - height) / 2;

            ctx.drawImage(img, x, y, width, height);

            const imageData = ctx.getImageData(0, 0, size, size);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];

                if (invert) {
                    r = 255 - r;
                    g = 255 - g;
                    b = 255 - b;
                }

                r = Math.min(255, r * brightness);
                g = Math.min(255, g * brightness);
                b = Math.min(255, b * brightness);

                data[i] = r;
                data[i + 1] = g;
                data[i + 2] = b;
            }

            ctx.putImageData(imageData, 0, 0);

            // ✅ 3. Save result to cache
            try {
                const dataUrl = canvas.toDataURL();
                canvasCache.set(cacheKey, dataUrl);
            } catch {
                // ignore tainted canvas errors (CORS cases)
            }
        };

        img.src = src;
    }, [src, size, invert, brightness]);

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className={className}
        />
    );
}