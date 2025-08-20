import { useGetClassesByStatus } from "@/queries/instituteQueries";
import { Loader2Icon } from "lucide-react";
import React from "react";
import BatchItem from "./BatchItem";

const JoinedClasses = ({ instituteId }: { instituteId?: string }) => {
  const { data, isLoading } = useGetClassesByStatus({
    instituteId,
    status: "accepted",
  });

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="w-full h-full grid place-items-center">
          <Loader2Icon className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="h-full">
          {data && data.classes && data.classes.length ? (
            data?.classes?.map((item) => (
              <BatchItem item={item} key={item._id} />
            ))
          ) : (
            <div className="w-full h-full grid place-items-center">
              <p className="text-center font-medium text-lg text-slate-500">
                No classes joined yet
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinedClasses;
