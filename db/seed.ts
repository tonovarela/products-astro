import { db, Role, User } from 'astro:db';
import { v4 as UUID } from 'uuid'

import { cifrar } from '@/adapter/crypt';
// https://astro.build/db/seed
export default async function seed() {
	const roles = [
		{ id: 'admin', name: 'Admin' },
		{ id: 'user', name: 'Usuario de sistema' }
	];
	const tonovarela={
		id: UUID(),
		name: 'Tonovarela',
		email:'tonovarela@live.com',
		password:cifrar('54321'),
		role: 'admin'
	}
	const juanito = {
		id: UUID(),
		name: 'Juanito',
		email:'j@lip.com',
		password: cifrar('123456'),
		role: 'admin'
	};
	const pedrito = {
		id: UUID(),
		name: 'Pedrito',
		email:'test@li.com',
		password: cifrar('123456'),
		role: 'user'
	}
	await db.insert(Role).values(roles);
	await db.insert(User).values([juanito, pedrito,tonovarela]);
}
