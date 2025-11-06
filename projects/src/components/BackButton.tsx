import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({
  href = "/",
  label = "Back to Portfolio"
}: BackButtonProps) {
  return (
    <Link href={href} className="inline-block mb-8">
      <Button
        variant="ghost"
        className="group hover:bg-slate-800/50"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {label}
      </Button>
    </Link>
  );
}
