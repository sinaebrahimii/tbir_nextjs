"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ImageResponse } from "@/utils/types/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DescriptionForm from "@/components/DescriptionForm";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
const getPhoto = async (id: string): Promise<ImageResponse> => {
  // Perform the mutation logic, e.g., make an API request to update the user

  const response = await fetch(`https://fastapi.darkube.app/photos/${id}`);

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

const Photo = () => {
  const params = useParams<{ id: string }>();
  console.log(params);
  const {
    data: photo,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["photo"],
    queryFn: () => getPhoto(params.id),
  });
  console.log();
  return (
    <div className="max-w-screen-lg mx-auto my-10 p-4 flex justify-center items-center h-full">
      {isSuccess && (
        <div className=" w-full sm:w-2/3 md:w-1/2 lg:w-1/2  overflow-hidden rounded-md">
          <Image
            src={photo?.url}
            layout="responsive" // Makes the image fill its container while maintaining aspect ratio
            objectFit="contain" // Ensures the image covers the entire container without distortion
            height={150}
            width={100}
            className="rounded-md h-[900px]"
            alt={"alt text"}
          />
          {photo.descriptions?.map((d) => {
            return (
              <div
                key={d.id}
                className="bg-slate-800 rounded-md text-white font-semibold text-center p-2 my-2"
              >
                {d.description}
              </div>
            );
          })}

          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex justify-center my-3">
                <Button className="mx-auto font-semibold" variant={"secondary"}>
                  Add Description
                </Button>
              </div>
            </DrawerTrigger>
            <DrawerContent className="bg-gray-800">
              <DrawerHeader>
                <DrawerTitle className="text-center text-white">
                  Add new description for this image
                </DrawerTitle>
              </DrawerHeader>
              <DescriptionForm id={params.id} />

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button className="w-40 mx-auto hover:bg-red-600 bg-red-500">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default Photo;
