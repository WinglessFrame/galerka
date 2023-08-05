import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "@/server/api/trpc";

import { activities } from "@/db/schema";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getExample: publicProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.supabase.auth.getSession()
    console.log({ user: data.session })
    const examples = await ctx.db.select().from(activities);
    return examples
  }),
});
