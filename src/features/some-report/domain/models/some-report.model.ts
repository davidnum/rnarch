import { z } from 'zod';

export const SomeReportModelSchema = z.object({
  text: z.string(),
});

export type SomeReportModel = z.infer<typeof SomeReportModelSchema>;
