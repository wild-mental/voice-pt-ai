
'use client';

import type { DailyWorkout, HealthInfo } from '@/types/fitness';
import type { AiPersonalTrainerVoiceGuideOutput } from '@/ai/flows/ai-personal-trainer-voice-guide';
import { getAiTrainerGuidance } from '@/actions/ai-trainer';
import { formatWorkoutForAI } from '@/lib/workout-generator';
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Play, Pause, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SoundwaveIcon from './SoundwaveIcon';

interface AiTrainerGuideProps {
  isOpen: boolean;
  onClose: () => void;
  dailyWorkout: DailyWorkout | null;
  healthInfo: HealthInfo | null;
}

export function AiTrainerGuide({ isOpen, onClose, dailyWorkout, healthInfo }: AiTrainerGuideProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [guidance, setGuidance] = useState<AiPersonalTrainerVoiceGuideOutput | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeechError, setIsSpeechError] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

    if (isOpen && dailyWorkout && healthInfo && synth) {
      setIsLoading(true);
      setGuidance(null);
      setIsPlaying(false);
      setIsSpeechError(false);
      
      const aiInput = formatWorkoutForAI(dailyWorkout, healthInfo);
      getAiTrainerGuidance(aiInput)
        .then((result) => {
          setGuidance(result);
        })
        .catch((err) => {
          console.error("Failed to get AI guidance:", err);
          toast({
            title: "Error",
            description: "Could not load AI trainer guidance. Please try again.",
            variant: "destructive",
          });
          setIsSpeechError(true);
        })
        .finally(() => setIsLoading(false));
    }

    return () => {
      if (synth && synth.speaking) {
        synth.cancel();
      }
      utteranceRef.current = null;
    };
  }, [isOpen, dailyWorkout, healthInfo, toast]);

  const handlePlayPause = () => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!guidance || !synth) return;

    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      setIsSpeechError(false);
      if (synth.paused && utteranceRef.current) {
        synth.resume();
        setIsPlaying(true);
      } else {
        const utterance = new SpeechSynthesisUtterance(guidance.voiceGuidance);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (event) => {
          console.error('SpeechSynthesisUtterance.onerror', event);
          toast({
            title: "Speech Error",
            description: "Could not play voice guidance. Your browser might not support it or there was an issue.",
            variant: "destructive",
          });
          setIsPlaying(false);
          setIsSpeechError(true);
        };
        utteranceRef.current = utterance;
        synth.speak(utterance);
        setIsPlaying(true);
      }
    }
  };
  
  const handleDialogClose = () => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (synth && synth.speaking) {
      synth.cancel();
    }
    setIsPlaying(false);
    utteranceRef.current = null;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleDialogClose(); }}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            AI Personal Trainer{dailyWorkout ? ` - ${dailyWorkout.day}` : ''}
          </DialogTitle>
          {dailyWorkout && <DialogDescription>{dailyWorkout.workoutName}</DialogDescription>}
        </DialogHeader>

        <div className="flex-grow overflow-hidden flex flex-col">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full space-y-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating your AI guide...</p>
            </div>
          )}

          {!isLoading && guidance && (
             <ScrollArea className="flex-grow pr-4 mb-2"> {/* Added mb-2 for spacing from soundwave */}
              <h3 className="text-lg font-semibold mb-2 text-primary/90">Closed Captions:</h3>
              <p className="text-sm whitespace-pre-line leading-relaxed text-foreground/80">
                {guidance.closedCaptions}
              </p>
            </ScrollArea>
          )}
          
          {!isLoading && guidance && isPlaying && (
            <div className="flex justify-center items-center py-2">
              <SoundwaveIcon isPlaying={true} className="h-8 w-auto text-accent" />
            </div>
          )}

          {!isLoading && !guidance && isSpeechError && (
             <div className="flex flex-col items-center justify-center h-full text-center">
              <XCircle className="h-12 w-12 text-destructive mb-2" />
              <p className="text-destructive-foreground">Failed to load AI guidance.</p>
              <p className="text-sm text-muted-foreground">Please check your connection or try again later.</p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-auto pt-4 border-t">
          <div className="w-full flex justify-between items-center">
            <Button variant="outline" onClick={handleDialogClose}>
              Close
            </Button>
            {guidance && !isSpeechError && (
              <Button onClick={handlePlayPause} disabled={isLoading || !guidance} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {isPlaying ? 'Pause' : 'Play'} Audio
              </Button>
            )}
             {isSpeechError && guidance && (
              <Button onClick={handlePlayPause} variant="destructive" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Play className="mr-2 h-5 w-5" /> Retry Audio
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
