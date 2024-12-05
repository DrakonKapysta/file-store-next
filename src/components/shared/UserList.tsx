import { IUser } from "@/models/IUser";
import React, { FC } from "react";
import { UserItem } from "./UserItem";

interface UserListProps {
  users: IUser[];
}

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div className="flex flex-col gap-4 pt-4 pb-4 mt-2 px-2 container mx-auto min-h-[calc(100vh-100px)] h-full overflow-y-auto shadow-md">
      {users.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          avatar={user.avatar}
          email={user.email}
        />
      ))}
    </div>
  );
};
