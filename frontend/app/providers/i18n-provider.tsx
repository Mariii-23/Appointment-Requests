"use client";

import React, { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";

type I18NProviderProps = {
  children: ReactNode;
};

export default function I18NProvider({ children }: I18NProviderProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
