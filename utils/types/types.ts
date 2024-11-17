export type description = {
    id: number;
    photo_id: number;
    description: string;
    created_at: string;
  };
  export type ImageResponse = {
    url: string;
    id: number;
    created_at: string;
    descriptions: description[];
  };


  export type DescResponse={
    created_at: string;
    description: string;
    id: string;
    photo_id: string;
  };