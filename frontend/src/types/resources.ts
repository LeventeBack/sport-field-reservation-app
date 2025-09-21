import { z } from "zod";

export type SportField = {
  id: number;
  title: string;
  description: string;
  openTime: number;
  closeTime: number;
  price: number;
  fieldTypeId: number;
  images: Image[];
};

export type SportFieldFilterForm = {
  search: string;
  type: number;
  minPrice: number;
  maxPrice: number;
};

export type SportFieldType = {
  id: number;
  name: string;
  slug: string;
};

export type Image = {
  id: number;
  sportFieldId: number;
  src: string;
  isBanner: boolean;
};

export type Reservation = {
  id: number;
  userId: number;
  sportFieldId: number;
  date: string;
  startTime: number;
  endTime: number;
  status: ReservationStatus;
};

export type ReservationStatus = "pending" | "approved" | "rejected";

export type UploadImageForm = {
  image: FileList;
  sportFieldId: number;
};

export type ReservationFormValues = {
  date: string;
  startTime: number;
  endTime: number;
};

export const fieldTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens",
  }),
});

export const sportFieldSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be less than 50 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description must be less than 2000 characters"),
    openTime: z
      .number()
      .int()
      .min(0, "Open time must be between 0 and 24")
      .max(24, "Open time must be between 0 and 24"),
    closeTime: z
      .number()
      .int()
      .min(0, "Close time must be between 0 and 24")
      .max(24, "Close time must be between 0 and 24"),
    price: z.number().int().min(0, "Price must be a positive number"),
    fieldTypeId: z.number().int().positive(),
  })
  .refine(({ openTime, closeTime }) => openTime < closeTime, {
    message: "Open time must be before close time",
    path: ["openTime"],
  });

export const reservationSchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format",
    }),
    startTime: z
      .number()
      .int()
      .min(0, "Start time must be between 0 and 24")
      .max(24, "Start time must be between 0 and 24"),
    endTime: z
      .number()
      .int()
      .min(0, "End time must be between 0 and 24")
      .max(24, "End time must be between 0 and 24"),
  })
  .refine(({ startTime, endTime }) => startTime < endTime, {
    message: "Start time must be before end time",
    path: ["startTime"],
  });
