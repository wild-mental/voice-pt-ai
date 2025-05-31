
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
import React, { useEffect } from 'react';

const healthInfoSchema = z.object({
  height: z.coerce.number().positive({ message: 'Height must be positive' }),
  weight: z.coerce.number().positive({ message: 'Weight must be positive' }),
  bodyFatPercentage: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().min(0).max(100).optional()
  ),
  waistCircumference: z.coerce.number().positive({ message: 'Waist circumference must be positive' }),
  diastolicBloodPressure: z.coerce.number().int().positive({ message: 'Diastolic BP must be a positive integer' }),
  systolicBloodPressure: z.coerce.number().int().positive({ message: 'Systolic BP must be a positive integer' }),
  leftThighCircumference: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().positive().optional()
  ),
  rightThighCircumference: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().positive().optional()
  ),
  fitnessGoals: z.string().min(10, { message: 'Please describe your fitness goals (min. 10 characters)' }),
});

type HealthInfoFormData = z.infer<typeof healthInfoSchema>;

interface HealthInfoFormProps {
  onSubmit: (data: HealthInfo) => void;
  defaultValues?: Partial<HealthInfoFormData>;
}

export function HealthInfoForm({ onSubmit, defaultValues: propDefaultValues }: HealthInfoFormProps) {
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

  const processOptionalNumber = (value: number | undefined): number | undefined => {
    if (typeof value === 'number' && !isNaN(value)) {
      return value;
    }
    return undefined;
  };

  const handleFormSubmit: SubmitHandler<HealthInfoFormData> = (data) => {
    const bmiNum = parseFloat(calculatedBmi);
    const whtrNum = parseFloat(calculatedWhtr);
    
    // `data` is already processed by Zod resolver.
    // Optional fields like bodyFatPercentage will be number or undefined due to preprocess.
    onSubmit({
      ...data,
      // Ensure final HealthInfo type fields are correctly number or undefined
      bodyFatPercentage: processOptionalNumber(data.bodyFatPercentage),
      leftThighCircumference: processOptionalNumber(data.leftThighCircumference),
      rightThighCircumference: processOptionalNumber(data.rightThighCircumference),
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
              Generate My Workout Program
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

    