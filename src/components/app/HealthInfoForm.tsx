
'use client';

import type { HealthInfo } from '@/types/fitness';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Retained as it might be used by FormLabel implicitly
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const healthInfoSchema = z.object({
  height: z.coerce.number().positive({ message: 'Height must be positive' }),
  weight: z.coerce.number().positive({ message: 'Weight must be positive' }),
  bodyFatPercentage: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce.number().min(0).max(100).optional()
  ),
  waistCircumference: z.coerce.number().positive({ message: 'Waist circumference must be positive' }),
  diastolicBloodPressure: z.coerce.number().int().positive({ message: 'Diastolic BP must be a positive integer' }),
  systolicBloodPressure: z.coerce.number().int().positive({ message: 'Systolic BP must be a positive integer' }),
  leftThighCircumference: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce.number().positive().optional()
  ),
  rightThighCircumference: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce.number().positive().optional()
  ),
  fitnessGoals: z.string().min(10, { message: 'Please describe your fitness goals (min. 10 characters)' }),

  // Optional Fitness Test Metrics
  shuttleRunCount: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  tenMeterShuttleRunTime: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  standingLongJumpCm: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  sitToStandCount: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  sixMinuteWalkDistanceM: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  twoMinuteStepCount: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  sitAndReachTargetTime: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  fiveMeterShuttleRunTime: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  repeatedSideStepCount: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
  eyeHandWallPassTime: z.preprocess((val) => (val === "" || val === null || val === undefined ? undefined : val), z.coerce.number().positive().optional()),
});

type HealthInfoFormData = z.infer<typeof healthInfoSchema>;

interface HealthInfoFormProps {
  onSubmit: (data: HealthInfo) => void;
  defaultValues?: Partial<HealthInfoFormData>;
}

export function HealthInfoForm({ onSubmit, defaultValues: propDefaultValues }: HealthInfoFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<HealthInfoFormData>({
    resolver: zodResolver(healthInfoSchema),
    defaultValues: {
      height: propDefaultValues?.height ?? '',
      weight: propDefaultValues?.weight ?? '',
      bodyFatPercentage: propDefaultValues?.bodyFatPercentage ?? '',
      waistCircumference: propDefaultValues?.waistCircumference ?? '',
      diastolicBloodPressure: propDefaultValues?.diastolicBloodPressure ?? '',
      systolicBloodPressure: propDefaultValues?.systolicBloodPressure ?? '',
      leftThighCircumference: propDefaultValues?.leftThighCircumference ?? '',
      rightThighCircumference: propDefaultValues?.rightThighCircumference ?? '',
      fitnessGoals: propDefaultValues?.fitnessGoals ?? '',
      shuttleRunCount: propDefaultValues?.shuttleRunCount ?? '',
      tenMeterShuttleRunTime: propDefaultValues?.tenMeterShuttleRunTime ?? '',
      standingLongJumpCm: propDefaultValues?.standingLongJumpCm ?? '',
      sitToStandCount: propDefaultValues?.sitToStandCount ?? '',
      sixMinuteWalkDistanceM: propDefaultValues?.sixMinuteWalkDistanceM ?? '',
      twoMinuteStepCount: propDefaultValues?.twoMinuteStepCount ?? '',
      sitAndReachTargetTime: propDefaultValues?.sitAndReachTargetTime ?? '',
      fiveMeterShuttleRunTime: propDefaultValues?.fiveMeterShuttleRunTime ?? '',
      repeatedSideStepCount: propDefaultValues?.repeatedSideStepCount ?? '',
      eyeHandWallPassTime: propDefaultValues?.eyeHandWallPassTime ?? '',
    },
  });

  useEffect(() => {
    const resetValues = {
      height: propDefaultValues?.height ?? '',
      weight: propDefaultValues?.weight ?? '',
      bodyFatPercentage: propDefaultValues?.bodyFatPercentage ?? '',
      waistCircumference: propDefaultValues?.waistCircumference ?? '',
      diastolicBloodPressure: propDefaultValues?.diastolicBloodPressure ?? '',
      systolicBloodPressure: propDefaultValues?.systolicBloodPressure ?? '',
      leftThighCircumference: propDefaultValues?.leftThighCircumference ?? '',
      rightThighCircumference: propDefaultValues?.rightThighCircumference ?? '',
      fitnessGoals: propDefaultValues?.fitnessGoals ?? '',
      shuttleRunCount: propDefaultValues?.shuttleRunCount ?? '',
      tenMeterShuttleRunTime: propDefaultValues?.tenMeterShuttleRunTime ?? '',
      standingLongJumpCm: propDefaultValues?.standingLongJumpCm ?? '',
      sitToStandCount: propDefaultValues?.sitToStandCount ?? '',
      sixMinuteWalkDistanceM: propDefaultValues?.sixMinuteWalkDistanceM ?? '',
      twoMinuteStepCount: propDefaultValues?.twoMinuteStepCount ?? '',
      sitAndReachTargetTime: propDefaultValues?.sitAndReachTargetTime ?? '',
      fiveMeterShuttleRunTime: propDefaultValues?.fiveMeterShuttleRunTime ?? '',
      repeatedSideStepCount: propDefaultValues?.repeatedSideStepCount ?? '',
      eyeHandWallPassTime: propDefaultValues?.eyeHandWallPassTime ?? '',
    };
    form.reset(resetValues);
  }, [propDefaultValues, form.reset]);

  const { watch } = form;
  const height = watch('height');
  const weight = watch('weight');
  const waistCircumference = watch('waistCircumference');

  const [calculatedBmi, setCalculatedBmi] = React.useState<string>("N/A");
  const [calculatedWhtr, setCalculatedWhtr] = React.useState<string>("N/A");

  useEffect(() => {
    const numHeight = Number(height);
    const numWeight = Number(weight);
    const numWaist = Number(waistCircumference);

    if (numHeight > 0 && numWeight > 0) {
      const heightInMeters = numHeight / 100;
      const bmi = numWeight / (heightInMeters * heightInMeters);
      setCalculatedBmi(bmi.toFixed(2));
    } else {
      setCalculatedBmi("N/A");
    }

    if (numHeight > 0 && numWaist > 0) {
      const whtr = numWaist / numHeight;
      setCalculatedWhtr(whtr.toFixed(2));
    } else {
      setCalculatedWhtr("N/A");
    }
  }, [height, weight, waistCircumference]);

  const processOptionalNumber = (value: number | string | undefined | null): number | undefined => {
    if (value === "" || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };

  const handleFormSubmit: SubmitHandler<HealthInfoFormData> = (data) => {
    const bmiNum = parseFloat(calculatedBmi);
    const whtrNum = parseFloat(calculatedWhtr);
    
    onSubmit({
      ...data,
      height: Number(data.height), // Ensure required fields are numbers
      weight: Number(data.weight),
      waistCircumference: Number(data.waistCircumference),
      diastolicBloodPressure: Number(data.diastolicBloodPressure),
      systolicBloodPressure: Number(data.systolicBloodPressure),

      bodyFatPercentage: processOptionalNumber(data.bodyFatPercentage),
      leftThighCircumference: processOptionalNumber(data.leftThighCircumference),
      rightThighCircumference: processOptionalNumber(data.rightThighCircumference),
      shuttleRunCount: processOptionalNumber(data.shuttleRunCount),
      tenMeterShuttleRunTime: processOptionalNumber(data.tenMeterShuttleRunTime),
      standingLongJumpCm: processOptionalNumber(data.standingLongJumpCm),
      sitToStandCount: processOptionalNumber(data.sitToStandCount),
      sixMinuteWalkDistanceM: processOptionalNumber(data.sixMinuteWalkDistanceM),
      twoMinuteStepCount: processOptionalNumber(data.twoMinuteStepCount),
      sitAndReachTargetTime: processOptionalNumber(data.sitAndReachTargetTime),
      fiveMeterShuttleRunTime: processOptionalNumber(data.fiveMeterShuttleRunTime),
      repeatedSideStepCount: processOptionalNumber(data.repeatedSideStepCount),
      eyeHandWallPassTime: processOptionalNumber(data.eyeHandWallPassTime),
      bmi: isNaN(bmiNum) ? 0 : bmiNum,
      waistToHeightRatio: isNaN(whtrNum) ? 0 : whtrNum,
    });
  };
  

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">Your Health Profile</CardTitle>
        <CardDescription>
          Please provide your health information to generate a personalized workout plan.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 175" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 70" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="waistCircumference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waist Circumference (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 80" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bodyFatPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Fat Percentage (%) (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 15" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>BMI (Calculated)</FormLabel>
                <Input type="text" value={calculatedBmi} readOnly className="bg-muted/50" />
              </FormItem>
              <FormItem>
                <FormLabel>Waist-to-Height Ratio (Calculated)</FormLabel>
                <Input type="text" value={calculatedWhtr} readOnly className="bg-muted/50" />
              </FormItem>
              <FormField
                control={form.control}
                name="systolicBloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systolic Blood Pressure (mmHg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 120" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diastolicBloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diastolic Blood Pressure (mmHg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 80" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leftThighCircumference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Left Thigh Circumference (cm) (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 55" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rightThighCircumference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Right Thigh Circumference (cm) (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 55" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fitnessGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitness Goals / Motivation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I want to lose 5kg and build muscle for summer."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="w-full flex items-center justify-center"
              >
                {isExpanded ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                {isExpanded ? 'Hide Optional Fitness Tests' : 'Show Optional Fitness Tests'}
              </Button>

              {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t mt-4">
                  <FormField control={form.control} name="shuttleRunCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>왕복오래달리기 (회)</FormLabel>
                      <FormControl><Input type="number" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="tenMeterShuttleRunTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>10M 4회 왕복달리기 (초)</FormLabel>
                      <FormControl><Input type="number" step="0.01" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="standingLongJumpCm" render={({ field }) => (
                    <FormItem>
                      <FormLabel>제자리 멀리뛰기 (cm)</FormLabel>
                      <FormControl><Input type="number" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="sitToStandCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>의자에 앉았다 일어서기 (회)</FormLabel>
                      <FormControl><Input type="number" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="sixMinuteWalkDistanceM" render={({ field }) => (
                    <FormItem>
                      <FormLabel>6분 걷기 (m)</FormLabel>
                      <FormControl><Input type="number" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="twoMinuteStepCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>2분 제자리 걷기 (회)</FormLabel>
                      <FormControl><Input type="number" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="sitAndReachTargetTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>의자에 앉아 3M 표적 돌아오기 (초)</FormLabel>
                      <FormControl><Input type="number" step="0.01" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="fiveMeterShuttleRunTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>5m 4회 왕복달리기 (초)</FormLabel>
                      <FormControl><Input type="number" step="0.01" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="repeatedSideStepCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>반복옆뛰기 (회)</FormLabel>
                      <FormControl><Input type="number" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="eyeHandWallPassTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>눈-손 벽패스 협응력 (초)</FormLabel>
                      <FormControl><Input type="number" step="0.01" placeholder="Optional" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}
            </div>

          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
              Generate My Workout Program
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
