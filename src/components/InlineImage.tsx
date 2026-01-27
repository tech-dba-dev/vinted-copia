import Image from "next/image";
import type { HTMLAttributes } from "react";

type InlineImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export function InlineImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  ...rest
}: InlineImageProps) {
  return (
    <span className={`relative block overflow-hidden ${className ?? ""}`} {...rest}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </span>
  );
}
