"use client";

import { Avatar } from "antd";
import { UserRound } from "lucide-react";
import { IUser } from "../../../types/user.types";

interface UserProfileBoxProps {
  user: IUser;
}

export default function UserProfileBox({ user }: UserProfileBoxProps) {
  return (
    <div
      className="flex w-fit items-center gap-2 border-gray-300 sm:cursor-pointer sm:rounded-md sm:border sm:p-1"
      onClick={(e) => e.preventDefault()}
    >
      <Avatar icon={<UserRound />} />
      <div className="pr-2">
        <p className="text-primary text-start text-xs font-semibold">
          {user?.name}
        </p>
        <p className="text-start text-xs font-medium text-gray-500">
          {user?.email}
        </p>
      </div>
    </div>
  );
}
