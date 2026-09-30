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
  const [isInitialized, setIsInitialized] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      const savedFavs = localStorage.getItem("fitlog_saved");
      if (savedPlan) setPlannedWorkouts(JSON.parse(savedPlan));
      if (savedFavs) setSavedWorkouts(JSON.parse(savedFavs));
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage on state changes only after initial load
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(plannedWorkouts));
    } catch (e) {}
  }, [plannedWorkouts, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    } catch (e) {}
  }, [savedWorkouts, isInitialized]);

  const addToPlan = (workout: any) => {
    // Check if already planned
    if (plannedWorkouts.some((w) => w.id === workout.id)) {
      showToast(`${workout.name} is already in today's plan`, "info");
      return;
    }

    // Enforce strict maximum cap of 5 workouts
    if (plannedWorkouts.length >= 5) {
      showToast("Cap of five lifts for today reached. Finish them, then load more.", "warning");
      return;
    }

    setPlannedWorkouts([...plannedWorkouts, workout]);
    showToast(`Added "${workout.name}" to today's plan`, "success");
  };

  const removeFromPlan = (id: number) => {
    const target = plannedWorkouts.find((w) => w.id === id);
    setPlannedWorkouts(plannedWorkouts.filter((w) => w.id !== id));
    if (target) {
      showToast(`Removed "${target.name}" from today's plan`, "info");
    }
  };

  const toggleSave = (workout: any) => {
    if (savedWorkouts.some((w) => w.id === workout.id)) {
      setSavedWorkouts(savedWorkouts.filter((w) => w.id !== workout.id));
      showToast(`Removed "${workout.name}" from saved`, "info");
    } else {
      setSavedWorkouts([...savedWorkouts, workout]);
      showToast(`Saved "${workout.name}" for later`, "success");
    }
  };

  const removeSaved = (id: number) => {
    const target = savedWorkouts.find((w) => w.id === id);
    setSavedWorkouts(savedWorkouts.filter((w) => w.id !== id));
    if (target) {
      showToast(`Removed "${target.name}" from saved`, "info");
    }
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
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl transition-all duration-300 bg-[#121215] border-[#ccff00]/40 text-white">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              toast.type === "warning" ? "bg-orange-400" : "bg-[#ccff00]"
            }`}
          />
          <span className="text-xs font-bold tracking-wide">{toast.message}</span>
        </div>
      )}
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