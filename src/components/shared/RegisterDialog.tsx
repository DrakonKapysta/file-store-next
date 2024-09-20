import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegistrationForm } from "./RegistrationForm";
import { Button } from "../ui/button";
export const RegisterDialog: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Register your account</DialogTitle>
          <DialogDescription>
            After registration you will access all the features for free.
          </DialogDescription>
          <RegistrationForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
