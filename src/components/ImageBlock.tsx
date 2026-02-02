import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function ImageBlock({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
}: ImageBlockProps) {
  // Não renderizar se src estiver vazio
  if (!src || src === "") {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${imageClassName ?? ""}`}
        priority={priority}
      />
    </div>
  );
}
