import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchRole } from "../store/slices/roleSlice";
import { FaUser, FaUserTie } from "react-icons/fa";

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);

  const handleSwitch = () => {
    dispatch(switchRole(currentRole === "lead" ? "member" : "lead"));
  };

  return (
    <button
      onClick={handleSwitch}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
        currentRole === "lead"
          ? "bg-stone-600 text-stone-100"
          : "bg-stone-300 text-stone-800 hover:bg-stone-400"
      }`}
    >
      {currentRole === "lead" ? (
        <FaUser className="mr-2" />
      ) : (
        <FaUserTie className="mr-2" />
      )}
      {currentRole === "lead" ? "Member View" : "Lead View"}
    </button>
  );
};

export default RoleSwitcher;
