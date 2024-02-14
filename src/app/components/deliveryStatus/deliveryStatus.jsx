import React, { useState } from "react";
import AppContainer from "../../components/container/container";
import { Space } from "../../components/space/Space";
import Active from "./Active/Active";
import Old from "./Old/Old";

export default function DeliveryStatus({ id }) {
  const [clicked, SetClicked] = useState(true);
  
  return (
    <>
      <div className="bg-white border-b-2 fixed top-12 w-full z-10 h-12">
        <AppContainer>
          <div className="flex justify-between item-center">
            <button
              className="w-full h-12 text-center text-2xl border-l-2 border-r"
              onClick={() => SetClicked(false)}
            >
              الطلبات السابقه
            </button>
            <button
              className="w-full h-12 text-center text-2xl border-l border-r-2"
              onClick={() => SetClicked(true)}
            >
              الطلبات النشطه
            </button>
          </div>
        </AppContainer>
      </div>
      <Space height="3rem" />
      {clicked ? <Active id={id} /> : null}
      {!clicked ? <Old id={id} /> : null}
    </>
  );
}
