"use client";
import SearchForm from "@/components/searchForm";
import ImageGallery from "@/components/ImageGallery";
import { useMutation } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

type description = {
  id: number;
  photo_id: number;
  description: string;
  created_at: string;
};
type ImageResponse = {
  url: string;
  id: number;
  created_at: string;
  descriptions: description[];
};

const serachPhotos = async (searchQ: string): Promise<ImageResponse[]> => {
  // Perform the mutation logic, e.g., make an API request to update the user
  const qParams = `?search_q=${searchQ}`;
  const response = await fetch(`http://fastapi.darkube.app/photos${qParams}`);

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};
export default function Home() {
  const mutation = useMutation<ImageResponse[], Error, string>({
    mutationFn: serachPhotos,
  });
  const handleSearch = (query: string) => {
    mutation.mutate(query);
    mutation.isSuccess && console.log(mutation.data);
  };

  return (
    <div className="container mx-auto  flex flex-col justify-center items-center">
      <SearchForm handleSearch={handleSearch} />
      {mutation.isPending && <SkeletonCard />}
      {mutation.isSuccess && <ImageGallery images={mutation.data} />}
    </div>
  );
}
