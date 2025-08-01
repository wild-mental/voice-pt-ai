
'use client';

import type { WorkoutProgram, DailyWorkout, Exercise } from '@/types/fitness';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Zap } from 'lucide-react'; // Changed Info to Play, Play was already imported.

interface WorkoutScheduleProps {
  workoutProgram: WorkoutProgram;
  onPlayWorkout: (dailyWorkout: DailyWorkout) => void;
  onPlayExercise: (dailyWorkout: DailyWorkout, exercise: Exercise) => void;
  onEditHealthInfo: () => void;
}

export function WorkoutSchedule({ workoutProgram, onPlayWorkout, onPlayExercise, onEditHealthInfo }: WorkoutScheduleProps) {
  if (!workoutProgram || workoutProgram.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No workout program generated yet.</p>
        <Button onClick={onEditHealthInfo} variant="link" className="text-primary">
          Enter your health info to get started.
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-headline text-primary">Your 7-Day Workout Schedule</h2>
        <Button onClick={onEditHealthInfo} variant="outline">
          Edit Health Info
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workoutProgram.map((dailyWorkout, index) => (
          <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-xl">{dailyWorkout.day}</CardTitle>
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <CardDescription className="text-base">{dailyWorkout.workoutName}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <h4 className="font-semibold text-primary/90">Exercises:</h4>
              <ul className="space-y-2 text-sm">
                {dailyWorkout.exercises.map((ex, exIndex) => (
                  <li key={exIndex} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{ex.name}:</span> {ex.sets} sets of {ex.reps}
                    </div>
                    {dailyWorkout.workoutName !== "Rest Day" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onPlayExercise(dailyWorkout, ex)}
                        className="h-7 w-7 text-primary/70 hover:text-primary"
                        aria-label={`Play guide for ${ex.name}`}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {dailyWorkout.workoutName !== "Rest Day" ? (
                <Button
                  onClick={() => onPlayWorkout(dailyWorkout)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  aria-label={`Play guide for ${dailyWorkout.day} - ${dailyWorkout.workoutName}`}
                >
                  <Play className="mr-2 h-5 w-5" /> Play Full AI Guide
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground w-full text-center italic">Enjoy your rest!</p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

