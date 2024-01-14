import React from "react";
import Container from "@/app/components/container/container";
import { FiMenu } from "react-icons/fi";
export default function Header() {
  return (
    <div>
      <div className="bg-white border-b-2">
        <Container>
          <div className="text-3xl flex items-center justify-end h-12">
            <FiMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
