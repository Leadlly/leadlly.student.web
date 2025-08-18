"use client";

import { getUserInstitute } from "@/actions/institute_actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setInstitute } from "@/redux/slices/instituteSlice";
import { useEffect } from "react";

const SetInstitute = () => {
  const institute = useAppSelector((state) => state.institute.institute);
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const setUserInstitute = async () => {
      try {
        const res = await getUserInstitute();
        dispatch(setInstitute(res.institute));
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.institute._id && (!institute || !institute._id)) {
      setUserInstitute();
    }
  }, [dispatch]);
  return null;
};

export default SetInstitute;
