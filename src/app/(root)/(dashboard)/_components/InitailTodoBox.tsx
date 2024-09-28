"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const InitialTodoBox = () => {
    return (
        <div className="h-full rounded-xl p-6 bg-gradient-to-b from-white/15 to-primary/15 flex flex-col items-center justify-center gap-4">
    <div className="w-full text-center space-y-4">
                <h4 className="text-2xl text-primary font-bold">
                    Help us create your plan
                </h4>

                <p className="text-sm text-gray-600">
                    Please provide an update on the topics you’ve completed in class so
                    far. This will help us tailor the sessions to your needs.
                </p>
            </div>

            <div className="w-full flex items-center justify-center">
                <Link href="/manage-account?tab=study-progress">
                    <Button
                        className="px-8 py-3 w-full sm:w-auto bg-primary text-white text-sm font-mada-semibold leading-tight rounded-md hover:bg-primary-dark transition-all duration-300"
                    >
                        Start
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default InitialTodoBox;
