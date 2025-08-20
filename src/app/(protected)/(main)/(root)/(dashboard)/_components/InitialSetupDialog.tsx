"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const InitialSetupDialog = ({
  openOnMount = false,
}: {
  openOnMount?: boolean;
}) => {
  console.log({ openOnMount });

  const [open, setOpen] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  console.log(dimensions);

  const searchParams = useSearchParams();

  const router = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("initialSetup");

    router.replace(`?${params.toString()}`, { scroll: false });

    setOpen(false);
  };

  useEffect(() => {
    if (openOnMount && elementRef.current) {
      setOpen(true);
      const { offsetWidth, offsetHeight } = elementRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [openOnMount]);

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
          <DialogContent
            ref={elementRef}
            className="sm:max-w-72 w-full h-72 flex flex-col items-center justify-center gap-y-3"
          >
            <h3 className="font-semibold text-center text-xl sm:text-2xl">
              Hooray!!!
            </h3>
            <p className="text-center text-base">
              You&apos;ve completed your account setup.
            </p>

            <p className="text-center text-base">We will be in touch.</p>

            <Button onClick={handleClose} className="max-w-32 h-10 w-full">
              Continue
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default InitialSetupDialog;
