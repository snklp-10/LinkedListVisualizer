import React from "react";
import { ListNode } from "../../lib/types";
import { ArrowRight } from "lucide-react";

const LinkedListDisplay = ({ nodes }: { nodes: ListNode[] }) => {
  return (
    <div className="border rounded-2xl p-6 flex items-center gap-4 overflow-x-auto h-40">
      <div className="flex items-center justify-center gap-4">
        <span className=" flex font-semibold text-lg bg-gray-300 ring-2 rounded-xl p-3">
          Head
        </span>
        <ArrowRight />
      </div>

      {nodes.map((node) => (
        <div key={node.id} className="flex items-center gap-3">
          <div className="border rounded-xl w-35 overflow-hidden">
            <div className="bg-yellow-200 font-bold text-center py-2">
              {node.value}
            </div>

            <div className="text-xs text-center bg-gray-100 py-1">
              {node.adddress}
            </div>

            <div className="flex text-xs text-center py-1 items-center justify-center gap-1">
              next
              <ArrowRight size={15} />
              {node.next ?? "NULL"}
            </div>
          </div>
          <ArrowRight />
        </div>
      ))}

      {nodes.length > 0 && (
        <span className="font-semibold text-gray-500 text-lg ring-2 rounded-xl p-3">
          NULL
        </span>
      )}
    </div>
  );
};

export default LinkedListDisplay;
