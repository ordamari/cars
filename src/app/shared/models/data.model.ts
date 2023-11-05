import { z } from 'zod'

const genderScheme = z.union([
    z.literal('Male'),
    z.literal('Female'),
    z.literal('Other'),
])

const motorTypeScheme = z.union([
    z.literal('Gasoline'),
    z.literal('Diesel'),
    z.literal('Electric'),
    z.literal('Hybrid'),
])

export const dataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    gender: genderScheme,
    dateOfBirth: z.date(),
    email: z.string().email(),
    city: z.string().min(1),
    country: z.string().min(1),
    address: z.string().min(1),
    hobbies: z.array(z.string().min(1)),
    color: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/),
    seats: z.number().min(2).max(7),
    motorType: motorTypeScheme,
})

export const dataItemsSchema = z.array(dataSchema)

export type Data = z.infer<typeof dataSchema>
