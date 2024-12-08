"use client";
import React, { FC } from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { createDir } from "@/actions/file";
import { useUserFileStore } from "@/store/userFileStore";

interface CreateFileFormProps {
  userId: string;
  closeModal: () => void;
}

interface FormData {
  name: string;
}

export const CreateUserFileForm: FC<CreateFileFormProps> = ({
  userId,
  closeModal,
}) => {
  const addFile = useUserFileStore((state) => state.addFile);
  const currentDir = useUserFileStore((state) => state.currentDir);

  const createDirHandler = async (folderName: string) => {
    const res = await createDir(folderName, currentDir, userId);
    if (res) {
      addFile(res);
    }
  };

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    createDirHandler(data.name);
    form.reset();
    closeModal();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 relative bg-white p-4 max-w-[400px] max-h-[200px] w-full h-full flex flex-col gap-4 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div>
            <div>Create new folder</div>
            <Button
              onClick={() => closeModal()}
              type="button"
              className="absolute top-1 right-1"
            >
              X
            </Button>
          </div>
        </div>
        <div className="mb-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold mb-2">
                  Folder name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter folder name"
                    {...field}
                    autoFocus={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4 w-full" type="submit">
            Create Folder
          </Button>
        </div>
      </form>
    </Form>
  );
};
