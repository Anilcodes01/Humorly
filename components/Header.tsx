"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session, status } = useSession();
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-purple-50/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0.4px)',
            }}
            className="flex items-center gap-2"
          >
            {/* <Image
              src="/humorly-high-resolution-logo-transparent (1).png"
              width={40}
              height={40}
              alt="Humorly"
              className="w-8 h-8 md:w-10 md:h-10"
            /> */}
            <h2 className="text-customPurple font-bold text-xl md:text-2xl">
              Humorly
            </h2>
          </motion.div>
        </Link>

        {initialLoading ? (
          <FiLoader size={20} className="animate-spin" />
        ) : !session ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-sm md:text-base px-3 md:px-4"
              onClick={() => signIn("google")}
            >
              Login
            </Button>
            <Link href="/signup">
              <Button className="text-sm md:text-base px-3 md:px-4">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>
              {session.user.name
                ? session.user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                : "?"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </motion.header>
  );
}