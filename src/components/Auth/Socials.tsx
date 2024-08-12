"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "components/UI/button";
import { DEFAULT_LOGIN_REDIRECT } from "src/routes";
import { signIn } from "next-auth/react";

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
  const onClick = (provider: string) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      {socials.map((social) => (
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => onClick(social.name.toLowerCase())}
          key={social.name}
        >
          <social.icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
};
