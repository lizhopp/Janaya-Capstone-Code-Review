
This is a review website for coding resources, built with React (frontend) and Express (backend). Users can review resources, filter by category, and bookmark their favorites.


Features:
User Reviews & Ratings
Category Filtering
 API Integration
Authentication System
Search & Pagination
 Bookmark Feature

 Schema:
Created the schema tables 
Debugger attached.
Starting to build tables...
Connected to PostgreSQL database
Finished building tables!
janayacooper=# \l
                                             List of databases
        Name         |    Owner     | Encoding |   Collate   |    Ctype    |       Access privileges       
---------------------+--------------+----------+-------------+-------------+-------------------------------
 acme_auth_store_db  | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 acme_employees_db   | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 acme_hr_db          | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 acme_ice_cream_db   | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/janayacooper             +
                     |              |          |             |             | janayacooper=CTc/janayacooper
 acme_reservation_db | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 acme_store_db       | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 coding_resources_db | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 coding_review_db    | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 janayacooper        | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 juicebox-dev        | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 postgres            | postgres     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 review_site_db      | janayacooper | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0           | postgres     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres                  +
                     |              |          |             |             | postgres=CTc/postgres
 template1           | postgres     | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres                  +
                     |              |          |             |             | postgres=CTc/postgres
(14 rows)

janayacooper=# \c coding_review_db
psql (14.15 (Homebrew), server 16.8 (Postgres.app))
WARNING: psql major version 14, server major version 16.
         Some psql features might not work.
You are now connected to database "coding_review_db" as user "janayacooper".
coding_review_db=# \d
                  List of relations
 Schema |       Name       |   Type   |    Owner     
--------+------------------+----------+--------------
 public | favorites        | table    | janayacooper
 public | favorites_id_seq | sequence | janayacooper
 public | resources        | table    | janayacooper
 public | resources_id_seq | sequence | janayacooper
 public | reviews          | table    | janayacooper
 public | reviews_id_seq   | sequence | janayacooper
 public | users            | table    | janayacooper
 public | users_id_seq     | sequence | janayacooper
(8 rows)