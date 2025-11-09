'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateAnnouncement, useUpdateAnnouncement } from '../hooks/useAnnouncements';
import { createAnnouncementSchema, type CreateAnnouncementInput } from '../schema';
import { ANNOUNCEMENT_STATUS, ANNOUNCEMENT_TARGET_TYPE } from '../constants';
import type { Announcement } from '../types';

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AnnouncementForm({
  announcement,
  onSuccess,
  onCancel,
}: AnnouncementFormProps) {
  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();

  const form = useForm<CreateAnnouncementInput>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: announcement
      ? {
          title: announcement.title,
          body: announcement.body,
          attachments: announcement.attachments || [],
          targetType: announcement.targetType,
          targetStores: announcement.targetStores || [],
          targetGroups: announcement.targetGroups || [],
          status: announcement.status,
        }
      : {
          title: '',
          body: '',
          attachments: [],
          targetType: ANNOUNCEMENT_TARGET_TYPE.ALL,
          targetStores: [],
          targetGroups: [],
          status: ANNOUNCEMENT_STATUS.DRAFT,
        },
  });

  const onSubmit = async (data: CreateAnnouncementInput) => {
    try {
      if (announcement) {
        await updateMutation.mutateAsync({
          id: announcement.id,
          payload: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error('공지사항 저장 실패:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="공지사항 제목을 입력하세요" {...field} />
              </FormControl>
              <FormDescription>공지사항의 제목을 입력하세요 (최대 200자)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="공지사항 내용을 입력하세요"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>공지사항의 상세 내용을 입력하세요 (최대 10000자)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>대상</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="대상 유형을 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ANNOUNCEMENT_TARGET_TYPE.ALL}>전체 매장</SelectItem>
                  <SelectItem value={ANNOUNCEMENT_TARGET_TYPE.STORE}>특정 매장</SelectItem>
                  <SelectItem value={ANNOUNCEMENT_TARGET_TYPE.GROUP}>매장 그룹</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>공지사항을 받을 대상을 선택하세요</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상태</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="상태를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ANNOUNCEMENT_STATUS.DRAFT}>임시저장</SelectItem>
                  <SelectItem value={ANNOUNCEMENT_STATUS.PUBLISHED}>게시</SelectItem>
                  <SelectItem value={ANNOUNCEMENT_STATUS.ARCHIVED}>보관</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>공지사항의 상태를 선택하세요</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
          )}
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            {announcement ? '수정' : '저장'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

