"use client";

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";

const Modal = ({
  children,
  setOpenDialogBox,
}: {
  children: React.ReactNode;
  setOpenDialogBox: (openDialogBox: boolean) => void;
}) => {
  const handleOpenChange = () => {
    setOpenDialogBox(false);
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="custom__scrollbar max-h-[90vh] max-w-3xl overflow-x-hidden overflow-y-auto bg-white px-0 py-0 text-black shadow-dialog">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
