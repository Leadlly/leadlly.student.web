import { Button } from "@/components/ui/button";
import { getClassesByStatus } from "@/actions/institute_actions";
import { useAppSelector } from "@/redux/hooks";
import { PlusIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const AllClasses = ({ instituteId }: { instituteId?: string }) => {
  const [toggleAllClasses, setToggleAllClasses] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { institute } = useAppSelector((state) => state.institute);

  useEffect(() => {
    const fetchClasses = async () => {
      if (institute?._id) {
        setIsLoading(true);
        try {
          const result = await getClassesByStatus("pending");
          setData(result);
        } catch (error: any) {
          console.error("Error fetching classes:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchClasses();
  }, [institute?._id]);

  return (
    <div className="relative h-full">
      <Button
        size={"icon"}
        className="rounded-full absolute bottom-2 right-2 bg-primary"
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default AllClasses;
