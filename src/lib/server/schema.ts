import { relations, sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const users = sqliteTable('users', {
	id: text('id')
		.$defaultFn(() => nanoid())
		.primaryKey(),
	email: text('email').unique(),
	username: text('username').unique(),
	first_name: text('first_name'),
	last_name: text('last_name'),
	bio: text('bio'),
	gender: text('gender', {
		enum: [
			'male',
			'female',
			'non-binary',
			'transgender',
			'genderqueer',
			'agender',
			'prefer not to say',
			'other',
		],
	}),
	phone: text('phone').unique(),
	language: text('language'),
	timezone_offset: text('timezone_offset'),
	photo: text('photo'),
	created_at: text('created_at'),
})

// export const companions = sqliteTable('companions', {
// 	id: text('id').$defaultFn(() => nanoid()),
// 	user_id: text('user_id')
// 		.notNull()
// 		.references(() => users.id),
// 	bio: text('bio'),
// 	emotions: text('emotions', { mode: 'json' }),
// 	memory: text('memory'),
// })

export const messages = sqliteTable('messages', {
	id: text('id')
		.$defaultFn(() => nanoid())
		.primaryKey(),
	user_id: text('user_id').references(() => users.id, { onDelete: 'set null' }),
	// companion_id: text('companion_id').references(() => companions.id),
	message: text('message').notNull(),
	created_at: text('created_at'),
})

// export const usersRelations = relations(users, ({ many }) => ({
// 	// companions: many(companions),
// 	messages: many(messages),
// }))

// export const companionsRelations = relations(companions, ({ one, many }) => ({
// 	user: one(users, {
// 		fields: [companions.user_id],
// 		references: [users.id],
// 	}),
// 	messages: many(messages),
// }))

// export const messagesRelations = relations(messages, ({ one }) => ({
// 	user: one(users, {
// 		fields: [messages.user_id],
// 		references: [users.id],
// 	}),
// 	// companion: one(companions, {
// 	// 	fields: [messages.companion_id],
// 	// 	references: [companions.id],
// 	// }),
// }))
