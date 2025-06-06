
'use client';

import React, { useState, useEffect } from 'react';
import type { HealthInfo, WorkoutProgram, DailyWorkout, Exercise } from '@/types/fitness';
import { HealthInfoForm } from '@/components/app/HealthInfoForm';
import { WorkoutSchedule } from '@/components/app/WorkoutSchedule';
import { AiTrainerGuide } from '@/components/app/AiTrainerGuide';
import { generateWorkoutProgram } from '@/lib/workout-generator';
import { Dumbbell } from 'lucide-react';

type AppView = 'form' | 'schedule';

export default function AIPersonalTrainerPage() {
  const [currentView, setCurrentView] = useState<AppView>('form');
  const [healthInfo, setHealthInfo] = useState<HealthInfo | null>(null);
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(null);
  
  const [isTrainerGuideOpen, setIsTrainerGuideOpen] = useState(false);
  const [selectedDailyWorkout, setSelectedDailyWorkout] = useState<DailyWorkout | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);


  // Load state from localStorage on mount
  useEffect(() => {
    const storedHealthInfo = localStorage.getItem('voicePtHealthInfo');
    const storedWorkoutProgram = localStorage.getItem('voicePtWorkoutProgram');
    
    if (storedHealthInfo && storedWorkoutProgram) {
      try {
        const parsedHealthInfo = JSON.parse(storedHealthInfo) as HealthInfo;
        const parsedWorkoutProgram = JSON.parse(storedWorkoutProgram) as WorkoutProgram;
        setHealthInfo(parsedHealthInfo);
        setWorkoutProgram(parsedWorkoutProgram);
        setCurrentView('schedule');
      } catch (error) {
        console.error("Error parsing data from localStorage", error);
        localStorage.removeItem('voicePtHealthInfo');
        localStorage.removeItem('voicePtWorkoutProgram');
      }
    }
  }, []);


  const handleHealthInfoSubmit = (data: HealthInfo) => {
    setHealthInfo(data);
    const program = generateWorkoutProgram(data);
    setWorkoutProgram(program);
    setCurrentView('schedule');
    
    // Save to localStorage
    localStorage.setItem('voicePtHealthInfo', JSON.stringify(data));
    localStorage.setItem('voicePtWorkoutProgram', JSON.stringify(program));
  };

  const handlePlayWorkout = (dailyWorkout: DailyWorkout) => {
    setSelectedDailyWorkout(dailyWorkout);
    setSelectedExercise(null); // Ensure no specific exercise is selected for full day guide
    setIsTrainerGuideOpen(true);
  };

  const handlePlayExercise = (dailyWorkout: DailyWorkout, exercise: Exercise) => {
    setSelectedDailyWorkout(dailyWorkout);
    setSelectedExercise(exercise);
    setIsTrainerGuideOpen(true);
  };
  
  const handleEditHealthInfo = () => {
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-center md:justify-start px-4">
          <Dumbbell className="h-8 w-8 mr-3 text-accent" />
          <h1 className="text-3xl font-headline">VoicePT.ai</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {currentView === 'form' && (
          <HealthInfoForm 
            onSubmit={handleHealthInfoSubmit} 
            defaultValues={healthInfo ? {
              height: healthInfo.height,
              weight: healthInfo.weight,
              bodyFatPercentage: healthInfo.bodyFatPercentage,
              waistCircumference: healthInfo.waistCircumference,
              diastolicBloodPressure: healthInfo.diastolicBloodPressure,
              systolicBloodPressure: healthInfo.systolicBloodPressure,
              leftThighCircumference: healthInfo.leftThighCircumference,
              rightThighCircumference: healthInfo.rightThighCircumference,
              fitnessGoals: healthInfo.fitnessGoals,
              shuttleRunCount: healthInfo.shuttleRunCount,
              tenMeterShuttleRunTime: healthInfo.tenMeterShuttleRunTime,
              standingLongJumpCm: healthInfo.standingLongJumpCm,
              sitToStandCount: healthInfo.sitToStandCount,
              sixMinuteWalkDistanceM: healthInfo.sixMinuteWalkDistanceM,
              twoMinuteStepCount: healthInfo.twoMinuteStepCount,
              sitAndReachTargetTime: healthInfo.sitAndReachTargetTime,
              fiveMeterShuttleRunTime: healthInfo.fiveMeterShuttleRunTime,
              repeatedSideStepCount: healthInfo.repeatedSideStepCount,
              eyeHandWallPassTime: healthInfo.eyeHandWallPassTime,
            } : undefined}
          />
        )}
        {currentView === 'schedule' && workoutProgram && (
          <WorkoutSchedule 
            workoutProgram={workoutProgram} 
            onPlayWorkout={handlePlayWorkout}
            onPlayExercise={handlePlayExercise}
            onEditHealthInfo={handleEditHealthInfo}
          />
        )}
      </main>

      <AiTrainerGuide
        isOpen={isTrainerGuideOpen}
        onClose={() => setIsTrainerGuideOpen(false)}
        dailyWorkout={selectedDailyWorkout}
        healthInfo={healthInfo}
        selectedExercise={selectedExercise}
      />

      <footer className="bg-card text-card-foreground py-6 border-t">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VoicePT.ai. All rights reserved.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Disclaimer: Consult with a healthcare professional before starting any new workout program.
          </p>
        </div>
      </footer>
    </div>
  );
}
