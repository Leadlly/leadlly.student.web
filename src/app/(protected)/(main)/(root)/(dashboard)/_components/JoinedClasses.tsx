import { getClassesByStatus } from "@/actions/institute_actions";
import { Loader2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import BatchItem from "./BatchItem";

const JoinedClasses = ({ instituteId }: { instituteId?: string }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      if (instituteId) {
        setIsLoading(true);
        try {
          const result = await getClassesByStatus("accepted");
          setData(result);
        } catch (error: any) {
          console.error("Error fetching classes:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchClasses();
  }, [instituteId]);

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="w-full h-full grid place-items-center">
          <Loader2Icon className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="h-full">
          {data && data.classes && data.classes.length ? (
            data?.classes?.map((item: any) => (
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
