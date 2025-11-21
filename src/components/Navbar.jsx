import React from "react";
import { Avatar } from "@mantine/core";

export default function Navbar() {
  return (
    <div className="w-full bg-white px-6 py-4 border-b flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <Avatar
          src="/avatar.png"
          radius="xl"
          size={32}
          styles={{
            root: { width: 32, height: 32 },
            image: { objectFit: "cover" },
          }}
        />
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <button className="hover:text-black">Home</button>
          <button className="hover:text-black">Claims</button>
          <button className="hover:text-black">Messages</button>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar
            src="/avatar.png"
            radius="xl"
            size={32}
            styles={{
              root: { width: 32, height: 32 },
              image: { objectFit: "cover" },
            }}
          />
          <div className="text-right text-sm">
            <p className="font-medium">Andy J.</p>
            <p className="text-gray-500 text-xs">Ford Service</p>
          </div>
        </div>

        {/* New Button */}
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">
          + New
        </button>
      </div>
    </div>
  );
}
