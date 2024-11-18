"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

type I = {
  search_q: string;
};

interface SearchFormProps {
  handleSearch: (query: string) => void; // Type for handleSearch prop
}
const SearchForm: React.FC<SearchFormProps> = ({ handleSearch }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<I>();
  const onSubmit: SubmitHandler<I> = (data) => {
    handleSearch(data.search_q);
    console.log(data.search_q);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto md:w-3/6  w-5/6 flex gap-2 justify-center items-center mt-10"
    >
      <Input
        className={`bg-gray-800  text-white ${
          errors.search_q && "border-red-500"
        }`}
        placeholder="Search..."
        {...register("search_q", { required: "Enter your search query" })}
      />

      <Button variant={"secondary"}>
        {" "}
        <FaSearch />
      </Button>
    </form>
  );
};

export default SearchForm;
