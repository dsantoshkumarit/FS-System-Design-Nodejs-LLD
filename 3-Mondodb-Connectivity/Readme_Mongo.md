- NoSQL - Not only SQL
- Redis/Mem Cache - Key-value store.
- Column family stores - cassandra
- GraphDB - Neo4j
- Document DB - MongoDB

# Why use mongodb:
- Flexibility.
- Doesn't enforce schema validation which speeds up the application development.
- Horizontal Scaling.

# SQL vs MongoDB:
## SQL:
- Tables
- Rows
- Columns

## MongoDB:
- Collections:
    - Set of documents which is equivalent to tables in relational DB.
    - Eg: Electronic vs Detergent have different data to be stored.
- Documents:
    - Equivalent to rows of data in SQL.
- Fields:
    - AKA properties or attributes which are similar to columns in a SQL table.

# ORM:
- Object Relational Mapping
- Translator between the data used in an application and the data we store in the database and vice versa.
- Eg: hibernate

# ODM:
- Object Data Model.
- Similar to ORM but for mongodb.
- Can be used to query the db, schema validation etc.
- Eg: Mongoose
- "mongosh" - JS and Node.js REPL shell environment to write mongodb queries.

# Mongoose:
- Mongoose is an ODM library for MongoDB and Node.js.
- It manages relationships between data. 
- Provides schema validation.
- Used to translate between objects in code and the representation of those objects in MongoDB.

