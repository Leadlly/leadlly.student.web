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
      <DialogContent className="text-black shadow-dialog bg-white max-w-3xl px-0 py-0 overflow-x-hidden overflow-y-auto custom__scrollbar">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
