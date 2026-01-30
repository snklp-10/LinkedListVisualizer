import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ListNode } from "@/lib/types";

const LinkedListDisplay = ({
  nodes,
  currentIndex,
}: {
  nodes: ListNode[];
  currentIndex: number | null;
}) => {
  return (
    <div className="border rounded-2xl p-6 flex items-center gap-6 overflow-x-auto h-44">
      {/* ✅ Head Block */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-lg bg-gray-200 ring-2 rounded-xl px-4 py-2">
          Head
        </span>
        <ArrowRight />
      </div>
      {/* ✅ Nodes */}
      {nodes.map((node, index) => {
        const isActive = index === currentIndex;
        const isVisited = currentIndex !== null && index < currentIndex;

        return (
          <motion.div
            key={node.id}
            animate={{
              scale: isActive ? 1.12 : 1,
              opacity: isVisited ? 0.35 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 18,
            }}
            className="flex items-center gap-3"
          >
            {/* Node Container */}
            <div className="flex flex-col items-center">
              {/* ✅ Pointer Label */}
              {isActive && (
                <div className="text-xs font-bold text-blue-600 mb-1">
                  CURRENT
                </div>
              )}

              {/* ✅ Node Box */}
              <div className="border rounded-xl w-[150px] overflow-hidden shadow-sm">
                {/* Value */}
                <div className="bg-yellow-200 font-bold text-center py-2">
                  {node.value}
                </div>

                {/* Address */}
                <div className="text-xs text-center bg-gray-100 py-1">
                  {node.adddress}
                </div>

                {/* Next Pointer */}
                <div className="flex text-xs py-1 items-center justify-center gap-1">
                  next <ArrowRight size={14} />
                  {node.next ?? "NULL"}
                </div>
              </div>
            </div>

            <ArrowRight />
          </motion.div>
        );
      })}

      {/* ✅ NULL */}
      {nodes.length > 0 && (
        <span className="font-semibold text-gray-500 text-lg ring-2 rounded-xl px-4 py-2">
          NULL
        </span>
      )}
    </div>
  );
};

export default LinkedListDisplay;
