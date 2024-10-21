"use client"; // Ensure client-side rendering for the component

import React from 'react';
import { ReturnButton } from "../ui/button";

export default function AboutPage() {
  return (
    <div className="p-4 flex flex-col space-y-4">
      {/* Ensure the button and list have proper spacing */}
      <ReturnButton href="/" className="" />
      <ul className="list-disc list-inside pt-10">
        <li>- Web Demo</li>
        <li>- About us</li>
      </ul>
    </div>
  );
}
