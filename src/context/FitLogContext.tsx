"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FitLogContextType {
  plannedWorkouts: any[];
  savedWorkouts: any[];
  addToPlan: (workout: any) => void;
  removeFromPlan: (id: number) => void;
  toggleSave: (workout: any) => void;
  removeSaved: (id: number) => void;
  isPlanned: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plannedWorkouts, setPlannedWorkouts] = useState<any[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);

  // Safely load from localStorage after mounting on the client
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      const savedFavs = localStorage.getItem("fitlog_saved");
      if (savedPlan) setPlannedWorkouts(JSON.parse(savedPlan));
      if (savedFavs) setSavedWorkouts(JSON.parse(savedFavs));
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(plannedWorkouts));
    } catch (e) {}
  }, [plannedWorkouts]);

  useEffect(() => {
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    } catch (e) {}
  }, [savedWorkouts]);

  const addToPlan = (workout: any) => {
    if (!plannedWorkouts.some((w) => w.id === workout.id)) {
      setPlannedWorkouts([...plannedWorkouts, workout]);
    }
  };

  const removeFromPlan = (id: number) => {
    setPlannedWorkouts(plannedWorkouts.filter((w) => w.id !== id));
  };

  const toggleSave = (workout: any) => {
    if (savedWorkouts.some((w) => w.id === workout.id)) {
      setSavedWorkouts(savedWorkouts.filter((w) => w.id !== workout.id));
    } else {
      setSavedWorkouts([...savedWorkouts, workout]);
    }
  };

  const removeSaved = (id: number) => {
    setSavedWorkouts(savedWorkouts.filter((w) => w.id !== id));
  };

  const isPlanned = (id: number) => plannedWorkouts.some((w) => w.id === id);
  const isSaved = (id: number) => savedWorkouts.some((w) => w.id === id);

  return (
    <FitLogContext.Provider
      value={{
        plannedWorkouts,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        toggleSave,
        removeSaved,
        isPlanned,
        isSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
};