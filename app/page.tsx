"use client";
import SearchForm from "@/components/searchForm";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

type description = {
  id: number;
  photo_id: number;
  description: string;
  created_at: string;
};
type SearchResult = {
  url: string;
  id: number;
  created_at: string;
  descriptions: description[];
};

const serachPhotos = async (searchQ: string): Promise<SearchResult> => {
  // Perform the mutation logic, e.g., make an API request to update the user

  const response = await fetch(`http://127.0.0.1:8000/photos/${searchQ}`);

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};
export default function Home() {
  const mutation = useMutation<SearchResult, Error, string>({
    mutationFn: serachPhotos,
  });
  const handleSearch = (query: string) => {
    mutation.mutate(query);
    mutation.isSuccess && console.log(mutation.data);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <SearchForm handleSearch={handleSearch} />
      {mutation.isSuccess && (
        <Image src={mutation.data.url} width={500} height={500} alt="image" />
      )}
    </div>
  );
}
