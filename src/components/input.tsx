import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useFormContext } from "@/context/formContext";
import { toast } from "sonner";
import Button from "./button";
import { useRouter } from "next/navigation"; // Changed import
import api from "@/config/api";

export default function Input() {
  const placeholders = [
    "In every image, a verse lies hidden, waiting to be found",
  ];

  const { formData, updateForm } = useFormContext();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isPoem, setPoem] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm("text", e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.text || !formData.image) {
      toast.warning('Missing form data');
    } else {
      setIsSubmit(true);

      const generatePoemPromise = async () => {
        try {
          const poem = await api.generate("Write a rhyming poem on this given picture. The poem should be of 3 para witha a title, each line should contains 7-8 words. Return it as a object with title and poem"+formData.text, formData.image);
          setPoem(poem);
          return poem;
        } catch (error) {
          throw new Error('Error generating poem');
        }
      };

      toast.promise(generatePoemPromise(), {
        loading: 'Redirecting',
        success: (data) => {
          router.push(`/poem?data=${encodeURIComponent(JSON.stringify(data))}`); // Serialized data before passing
          return "Success";
        },
        error: (error) => {
          console.error(error);
          return 'Error generating poem';
        },
      });
    }
  };

  return (
    <div className="w-screen z-30 flex flex-col items-center justify-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <div className="mt-4 md:mt-6">
        <Button isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
      </div>
    </div>
  );
}
