import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { Button } from "../ui/button";
export const LoginDialog: FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="mb-2">Login your account</DialogTitle>
          <LoginForm onClose={() => setOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
