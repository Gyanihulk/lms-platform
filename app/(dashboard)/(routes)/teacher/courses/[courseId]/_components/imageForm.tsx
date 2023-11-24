"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { FileUpload } from "@/components/fileUpload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();




  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : !initialData.imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl?(
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500"/>
          </div>
        ):(<div className="relative aspect-video mt-2"><Image alt="Upload" src={initialData.imageUrl} fill className="object-cover rounded-md"/></div>)
      )}
      {isEditing && (
        <>
        <FileUpload endpoint="courseImage" onChange={(url)=>{ console.log(url) 
          if(url){onSubmit({imageUrl:url})}}}/>
        <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
        </>
      )}
    </div>
  );
};
