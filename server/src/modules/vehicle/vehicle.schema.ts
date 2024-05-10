import { z } from "zod";

export const vehicleSchema = z.object({
  placa: z.string().refine(placa => /^[A-Z]{3}-[0-9]{4}$/.test(placa)),
  chassi: z.string().length(17),
  renavam: z.number().int().min(100000000).max(99999999999),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number().int().min(1886).max(2100)
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;

export const vehicleIdParamSchema = z.object({
  id: z
    .string()
    .refine(id => Number.isInteger(Number(id)) && Number(id) > 0)
    .transform(id => Number(id))
});
