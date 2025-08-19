import ChemistryIcon from "@/components/icons/ChemistryIcon";
import MathsIcon from "@/components/icons/MathsIcon";
import PhysicsIcon from "@/components/icons/PhysicsIcon";
import { Card, CardContent } from "@/components/ui/card";
import { IClassesProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import React from "react";

const BatchItem = ({ item }: { item: IClassesProps }) => {
  return (
    <Card className="w-full mt-2">
      <CardContent className="flex items-center gap-3">
        <div
          className={cn(
            "size-10 rounded-full items-center justify-center",
            item.subject === "chemistry"
              ? "bg-[#1472FF]"
              : item.subject === "physics"
                ? "bg-[#27CEB2]"
                : item.subject === "mathematics"
                  ? "bg-primary"
                  : "bg-primary/10"
          )}
        >
          {item.subject === "chemistry" ? (
            <ChemistryIcon stroke="white" />
          ) : item.subject === "physics" ? (
            <PhysicsIcon stroke="white" />
          ) : item.subject === "mathematics" ? (
            <MathsIcon stroke="white" />
          ) : null}
        </div>

        <div className="flex-1">
          <span className="font-semibold text-lg capitalize">
            {item.batch.name}
          </span>

          <span className="text-base text-secondary capitalize">
            {item.subject}
          </span>

          <span className="text-base text-secondary capitalize">
            Teacher: {item.teacher.firstname}{" "}
            {item.teacher.lastname ? item.teacher.lastname : null}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchItem;
