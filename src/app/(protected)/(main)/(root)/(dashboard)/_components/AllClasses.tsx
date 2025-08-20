import { Button } from "@/components/ui/button";
import { useGetClassesByStatus } from "@/queries/instituteQueries";
import { useAppSelector } from "@/redux/hooks";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

const AllClasses = ({ instituteId }: { instituteId?: string }) => {
  const [toggleAllClasses, setToggleAllClasses] = useState(false);

  const { institute } = useAppSelector((state) => state.institute);

  const { data, isLoading } = useGetClassesByStatus({
    instituteId: institute?._id,
    status: "pending",
  });

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
