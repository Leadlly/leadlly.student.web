"use client";

import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";

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
      <DialogOverlay className="backdrop-blur-sm">
        <DialogContent className="text-black text-3xl shadow-dialog bg-white rounded-xl max-w-4xl w-full px-0 py-0 overflow-hidden">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
