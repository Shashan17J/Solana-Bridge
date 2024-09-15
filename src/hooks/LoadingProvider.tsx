"use client";

import React, { useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadingIndicator: ReactNode; // Added loading indicator
}

const LoadingContext = React.createContext<LoadingContextType | undefined>(
  undefined
);

const defaultLoadingIndicator = (
  <div className="flex absolute items-center justify-center h-screen bg-transparent">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export const LoadingProvider: React.FC<{
  children: ReactNode;
  loadingIndicator?: ReactNode; // Optional loading indicator prop
}> = ({ children, loadingIndicator = defaultLoadingIndicator }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, loadingIndicator }}>
      {loading && loadingIndicator}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
