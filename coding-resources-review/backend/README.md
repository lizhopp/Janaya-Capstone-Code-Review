# Capstone-Code-Review
janayacooper@Janayas-MBP coding-resources-review % node db/seed.js
Debugger listening on ws://127.0.0.1:49972/5eadec6c-b470-4ab0-a756-7305b97851da
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
Connected to the database
Debugger ending on ws://127.0.0.1:49972/5eadec6c-b470-4ab0-a756-7305b97851da
For help, see: https://nodejs.org/en/docs/inspector
Starting to drop tables...
Finished dropping tables!
Starting to build tables...
Finished building tables!
Starting to create users...
Finished creating users!
Starting to create resources...
Finished creating resources!
Starting to create reviews...
Finished creating reviews!
Starting to create favorites...
Finished creating favorites!
Starting to test database...
Calling getAllUsers
Result: [
  { id: 1, username: 'admin', email: 'admin@gmail.com' },
  { id: 2, username: 'guestuser', email: 'guestuser@gmail.com' },
  { id: 3, username: 'testuser', email: 'testuser@gmail.com' }
]
Calling updateUser on users[0]
Result: {
  id: 1,
  username: 'newadmin',
  email: 'admin@gmail.com',
  password: '$2b$10$seR7DyzoyYlIDCjXt0.vPuGIbqmp//wNxAryrHoTxAt4mf6vclJ6C',
  isadmin: false,
  created_at: 2025-03-10T00:07:07.366Z,
  updated_at: 2025-03-10T00:07:07.366Z
}
Calling getAllResources
Result: [
  {
    id: 1,
    title: 'React Tutorial',
    type: 'video',
    language: 'JavaScript',
    link: 'https://reactjs.org/tutorial',
    description: 'Learn React basics',
    created_at: 2025-03-10T00:07:07.461Z,
    updated_at: 2025-03-10T00:07:07.461Z
  },
  {
    id: 2,
    title: 'Eloquent JavaScript',
    type: 'book',
    language: 'JavaScript',
    link: 'https://eloquentjavascript.net',
    description: 'A great book on JavaScript',
    created_at: 2025-03-10T00:07:07.462Z,
    updated_at: 2025-03-10T00:07:07.462Z
  },
  {
    id: 3,
    title: 'Node.js Guide',
    type: 'article',
    language: 'JavaScript',
    link: 'https://nodejs.org/guide',
    description: 'Official Node.js guide',
    created_at: 2025-03-10T00:07:07.463Z,
    updated_at: 2025-03-10T00:07:07.463Z
  }
]
Calling updateResource on resources[0]
Result: {
  id: 1,
  title: 'React Basics',
  type: 'video',
  language: 'JavaScript',
  link: 'https://reactjs.org/tutorial',
  description: 'Learn React basics',
  created_at: 2025-03-10T00:07:07.461Z,
  updated_at: 2025-03-10T00:07:07.461Z
}
Calling getResourceById with 1
Result: {
  id: 1,
  title: 'React Basics',
  type: 'video',
  language: 'JavaScript',
  link: 'https://reactjs.org/tutorial',
  description: 'Learn React basics',
  created_at: 2025-03-10T00:07:07.461Z,
  updated_at: 2025-03-10T00:07:07.461Z
}
Calling getReviewsByResourceId with 1
Result: [
  {
    id: 1,
    user_id: 1,
    resource_id: 1,
    rating: 5,
    comment: 'Great tutorial!',
    created_at: 2025-03-10T00:07:07.464Z,
    updated_at: 2025-03-10T00:07:07.464Z
  }
]
Calling getFavoritesByUserId with 1
Result: [ { id: 1, user_id: 1, resource_id: 1 } ]
Finished database tests!

List of relations
 Schema |   Name    | Type  |    Owner     
--------+-----------+-------+--------------
 public | favorites | table | janayacooper
 public | resources | table | janayacooper
 public | reviews   | table | janayacooper
 public | users     | table | janayacooper
(4 rows)