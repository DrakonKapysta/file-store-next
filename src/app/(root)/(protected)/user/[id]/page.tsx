import { getUserById } from "@/actions/user";
import { UserDisk } from "@/components/shared/UserDisk";
import { AVATAR_URL } from "@/config/fileConfig";
import sizeFormat from "@/lib/sizeFormat";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = (await getUserById(id))?.[0];

  const avatar = user?.avatar ? AVATAR_URL + user.avatar : "/avatar.svg";

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-2 items-center h-full overflow-hidden pb-2">
      <h2 className="text-2xl text-center font-bold">User</h2>
      <div className="flex gap-4 items-center border rounded-md border-gray-400 p-4 shadow-md">
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold ">Email:</span>{" "}
            <span>{user?.email}</span>
          </p>
          <p>
            <span className="font-semibold ">Disk Space:</span>{" "}
            <span>{sizeFormat(user?.diskSpace || 0)}</span>
          </p>
          <p>
            <span className="font-semibold ">Used Space:</span>{" "}
            <span>{sizeFormat(user?.usedSpace || 0)}</span>
          </p>
          <p>
            <span className="font-semibold ">Roles:</span>{" "}
            <span>{user?.roles.join(", ")}</span>
          </p>
        </div>
        <div>
          <Image
            className="rounded-full"
            src={avatar}
            alt="avatar"
            width={200}
            height={200}
            style={{ objectFit: "cover", height: "200px", width: "200px" }}
            unoptimized
          />
        </div>
      </div>
      <UserDisk userId={id} />
    </div>
  );
}
