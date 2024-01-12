import React from "react";
import Container from "@/app/components/container/container";
import { FiMenu } from "react-icons/fi";
export default function Header() {
  return (
    <div>
      <div className="h-24">
        <Container>
          <div className="text-3xl flex items-end justify-end">
            <FiMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
