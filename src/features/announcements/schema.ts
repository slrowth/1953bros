import { z } from 'zod';

export const announcementStatusSchema = z.enum(['draft', 'published', 'archived']);

export const announcementTargetTypeSchema = z.enum(['all', 'store', 'group']);

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.').max(200, '제목은 200자 이하여야 합니다.'),
  body: z.string().min(1, '내용은 필수입니다.').max(10000, '내용은 10000자 이하여야 합니다.'),
  attachments: z.array(z.string().url()).optional(),
  targetType: announcementTargetTypeSchema,
  targetStores: z.array(z.string().uuid()).optional(),
  targetGroups: z.array(z.string().uuid()).optional(),
  status: announcementStatusSchema,
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial();

export const acknowledgeAnnouncementSchema = z.object({
  announcementId: z.string().uuid(),
  storeId: z.string().uuid(),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
export type AcknowledgeAnnouncementInput = z.infer<typeof acknowledgeAnnouncementSchema>;

