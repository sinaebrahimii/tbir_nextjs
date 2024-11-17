import Image from "next/image";
import { ImageResponse } from "@/utils/types/types";
import { useRouter } from "next/navigation";

const ImageGallery = ({ images }: { images: ImageResponse[] }) => {
  const router = useRouter();
  return (
    <div className="mx-auto w-5/6  grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-start place-content-center mt-4">
      {images.map((img, index) => (
        <div key={img.id} className="w-full ">
          <Image
            onClick={() => router.push(`/photos/${img.id}`)}
            src={img.url}
            alt={`Gallery image ${index + 1}`}
            width={1080}
            height={1000}
            objectFit="contain"
            className="rounded-md cursor-pointer"
            priority={index < 4} // Only set priority for first few images for better performance
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
