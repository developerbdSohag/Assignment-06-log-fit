"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/fitlog";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  toggleSave: (workout: Workout) => void;
  removeSaved: (id: number) => void;
  isPlanned: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedList = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedList) setSaved(JSON.parse(savedList));
  }, []);

  const saveToStorage = (newPlan: Workout[], newSaved: Workout[]) => {
    setPlan(newPlan);
    setSaved(newSaved);
    localStorage.setItem("fitlog_plan", JSON.stringify(newPlan));
    localStorage.setItem("fitlog_saved", JSON.stringify(newSaved));
  };

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) return;
    if (plan.length >= 5) {
      alert("Today's plan is capped at 5 lifts. Finish some, then add more!");
      return;
    }
    const updated = [...plan, workout];
    saveToStorage(updated, saved);
  };

  const removeFromPlan = (id: number) => {
    const updated = plan.filter((item) => item.id !== id);
    saveToStorage(updated, saved);
  };

  const toggleSave = (workout: Workout) => {
    let updatedSaved;
    if (saved.some((item) => item.id === workout.id)) {
      updatedSaved = saved.filter((item) => item.id !== workout.id);
    } else {
      updatedSaved = [...saved, workout];
    }
    saveToStorage(plan, updatedSaved);
  };

  const removeSaved = (id: number) => {
    const updatedSaved = saved.filter((item) => item.id !== id);
    saveToStorage(plan, updatedSaved);
  };

  const isPlanned = (id: number) => plan.some((item) => item.id === id);
  const isSaved = (id: number) => saved.some((item) => item.id === id);

  return (
    <FitLogContext.Provider value={{ plan, saved, addToPlan, removeFromPlan, toggleSave, removeSaved, isPlanned, isSaved }}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used within a FitLogProvider");
  return context;
}