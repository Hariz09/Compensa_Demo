"use client"; // Ensure client-side rendering for the component

import React from 'react';
import { ReturnButton } from "../../ui/button";

export default function EmployeePage() {
  return (
    <div className="p-14 flex flex-col space-y-4">
      <ReturnButton href="/login" className="" />
      <p>Employee Dashbord</p>
    </div>
  );
}
