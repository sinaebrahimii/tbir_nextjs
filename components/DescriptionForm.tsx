"use client";
import React from "react";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import {
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { DescResponse } from "@/utils/types/types";
type Payload = {
  desc: string;
  id: number;
};
const postData = async (payload: Payload): Promise<DescResponse> => {
  const url = "https://fastapi.darkube.app/photos/description";
  const data = {
    description: payload.desc,
    photo_id: payload.id,
  };
  console.log(payload.desc);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};
type I = {
  desc: string;
};
const DescriptionForm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<DescResponse, Error>({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo"] });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I>();
  const addDesc: SubmitHandler<I> = (data) => {
    const payload = {
      desc: data.desc,
      id: id,
    };
    mutation.mutate(payload);
  };
  return (
    <form
      className="w-2/4 mx-auto flex flex-col justify-center items-center  text-white"
      onSubmit={handleSubmit(addDesc)}
    >
      <Input
        className={`bg-gray-800  text-white ${errors.desc && "border-red-500"}`}
        {...register("desc", { required: "Enter the Description" })}
      />
      <Button className="w-40 mx-auto hover:bg-green-600 mt-5">Add</Button>
    </form>
  );
};

export default DescriptionForm;
