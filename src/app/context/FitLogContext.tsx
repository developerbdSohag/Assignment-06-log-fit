"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/fitlog";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  completed: string[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  toggleSave: (workout: Workout) => void;
  markAsDone: (id: string | number) => void;
  isSaved: (id: string | number) => boolean;
  isPlanned: (id: string | number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    const localCompleted = localStorage.getItem("fitlog_completed");
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
    if (localCompleted) setCompleted(JSON.parse(localCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("fitlog_completed", JSON.stringify(completed));
  }, [completed]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) return;
    if (plan.length >= 5) {
      alert("Plan is capped at 5 lifts for today!");
      return;
    }
    setPlan([...plan, workout]);
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((item) => item.id !== id));
  };

  const toggleSave = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      setSaved(saved.filter((item) => item.id !== id));
    } else {
      setSaved([...saved, workout]);
    }
  };

  const markAsDone = (id: string | number) => {
    if (!completed.includes(id.toString())) {
      setCompleted([...completed, id.toString()]);
    }
  };

  const isSaved = (id: string | number) => saved.some((item) => item.id === id);
  const isPlanned = (id: string | number) => plan.some((item) => item.id === id);

  return (
    <FitLogContext.Provider value={{ plan, saved, completed, addToPlan, removeFromPlan, toggleSave, markAsDone, isSaved, isPlanned }}>
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used within a FitLogProvider");
  return context;
};