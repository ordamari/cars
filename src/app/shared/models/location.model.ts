import { z } from 'zod'

export const locationSchema = z.object({
    Version: z.number(),
    Key: z.string(),
    Type: z.string(),
    Rank: z.number(),
    LocalizedName: z.string(),
    Country: z.object({
        ID: z.string(),
        LocalizedName: z.string(),
    }),
    AdministrativeArea: z.object({
        ID: z.string(),
        LocalizedName: z.string(),
    }),
})

export const locationsSchema = z.array(locationSchema)

export type Location = z.infer<typeof locationSchema>
