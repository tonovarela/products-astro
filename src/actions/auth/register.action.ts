import { defineAction } from 'astro:actions';
import { db, User,eq } from 'astro:db';
import { v4 as UUID } from 'uuid';
import { z } from 'astro:schema';

import { cifrar } from '@/adapter/crypt';


export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  handler: async ({ name, email, password }, { cookies }) => {
    const  [user] = await db.select().from(User).where(eq(User.email,`${email}`));
    if (!user) {
      throw new Error('User not found');
    }
     db.insert(User).values({
      id: UUID(),
      name,
      email,
      password:cifrar(password),
      role:'user'
     }).execute();

      


    return { ok: true, message: 'User registered successfully' }; 
  },
});
