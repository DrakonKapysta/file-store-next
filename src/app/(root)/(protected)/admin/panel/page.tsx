import { getAllUsers } from "@/actions/user";
import { UserList } from "@/components/shared/UserList";
import React from "react";

export default async function AdminPanel() {
  const users = await getAllUsers();

  if (!users) {
    return <div className="text-center text-3xl h-full">Users not found!</div>;
  }
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
