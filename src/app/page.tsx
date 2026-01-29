import LinkedListVisualizer from "@/components/linkedList/linkedListVisualiser";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const LinkedListPage = () => {
  return (
    <MaxWidthWrapper className="flex flex-col py-6 gap-6 items-center">
      <LinkedListVisualizer />
    </MaxWidthWrapper>
  );
};

export default LinkedListPage;
