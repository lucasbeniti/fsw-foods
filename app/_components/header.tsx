import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <Link href="/">
      <div className="flex justify-between px-5 pt-6">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            className="object-cover"
          />
        </div>

        <Button
          variant={"outline"}
          size={"icon"}
          className="border-none bg-transparent"
        >
          <MenuIcon />
        </Button>
      </div>
    </Link>
  );
};

export default Header;
