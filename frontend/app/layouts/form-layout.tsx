"use client";

import React from 'react';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function FormLayout({ title, children }: FormLayoutProps) {
  return (
    <div className="p-10"> 
      <h1 className="text-center mb-10">{title}</h1> 
      {children}
    </div>
  );
}