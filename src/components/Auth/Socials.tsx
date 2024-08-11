"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "components/UI/button";

const socials = [
  {
    name: "Google",
    icon: FcGoogle,
  },
  {
    name: "Github",
    icon: FaGithub,
  },
];

export const Socials = () => {
  return (
    <div className="flex w-full items-center gap-x-2">
      {socials.map((social) => (
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => {}}
          key={social.name}
        >
          <social.icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
};
