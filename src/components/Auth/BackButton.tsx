"use client";

import Link from "next/link";
import { Button } from "components/UI/button";

interface IProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: IProps) => {
  return (
    <Button variant="link" className="w-full font-normal" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
