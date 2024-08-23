import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const users = sqliteTable('users', {
	id: text('id').$default(() => nanoid()),
	fullName: text('full_name'),
	phone: text('phone'),
})
