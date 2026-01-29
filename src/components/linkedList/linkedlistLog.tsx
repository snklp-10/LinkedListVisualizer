import { ActivityLog } from "@/lib/types";
import React from "react";

const LinkedListLog = ({ logs }: { logs: ActivityLog[] }) => {
  return (
    <div className="rounded-2xl p-4 h-50 overflow-y-auto">
      {logs.length === 0 ? (
        <p className="text-sm text-left p-2 px-3 font-medium rounded-md bg-gray-300">
          No Operations performed yet
        </p>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`text-sm text-left p-2 px-3 font-medium rounded-md ${
                log.type === "success"
                  ? "bg-green-200"
                  : log.type === "error"
                    ? "bg-red-300"
                    : "bg-gray-400"
              }`}
            >
              {log.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkedListLog;
