This is a review website for coding resources, built with React (frontend) and Express (backend). Users can review resources, filter by category, and bookmark their favorites.

Features:
User Reviews & Ratings
Category Filtering
API Integration
Authentication 
Search 


Schema:
Created the schema tables
Debugger attached.
Starting to build tables...
Connected to PostgreSQL database
Finished building tables!
janayacooper=# \l
List of databases
Name | Owner | Encoding | Collate | Ctype | Access privileges  
---------------------+--------------+----------+-------------+-------------+-------------------------------
acme_auth_store_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
acme_employees_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
acme_hr_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
acme_ice_cream_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 | =Tc/janayacooper +
| | | | | janayacooper=CTc/janayacooper
acme_reservation_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
acme_store_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
coding_resources_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
coding_review_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
janayacooper | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
juicebox-dev | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
postgres | postgres | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
review_site_db | janayacooper | UTF8 | en_US.UTF-8 | en_US.UTF-8 |
template0 | postgres | UTF8 | en_US.UTF-8 | en_US.UTF-8 | =c/postgres +
| | | | | postgres=CTc/postgres
template1 | postgres | UTF8 | en_US.UTF-8 | en_US.UTF-8 | =c/postgres +
| | | | | postgres=CTc/postgres
(14 rows)

janayacooper=# \c coding_review_db
psql (14.15 (Homebrew), server 16.8 (Postgres.app))
WARNING: psql major version 14, server major version 16.
Some psql features might not work.
You are now connected to database "coding_review_db" as user "janayacooper".
coding_review_db=# \d
List of relations
Schema | Name | Type | Owner  
--------+------------------+----------+--------------
public | favorites | table | janayacooper
public | favorites_id_seq | sequence | janayacooper
public | resources | table | janayacooper
public | resources_id_seq | sequence | janayacooper
public | reviews | table | janayacooper
public | reviews_id_seq | sequence | janayacooper
public | users | table | janayacooper
public | users_id_seq | sequence | janayacooper
(8 rows)

coding_review_db=# SELECT \* FROM users;
id | username | email | password | isadmin | created_at | updated_at  
----+----------+-----------------+----------+---------+----------------------------+----------------------------
1 | admin | admin@gmail.com | admin123 | t | 2025-03-18 19:43:54.357697 | 2025-03-18 19:43:54.357697
2 | user1 | user1@gmail.com | user123 | f | 2025-03-18 19:43:54.357697 | 2025-03-18 19:43:54.357697
3 | user2 | user2@gmail.com | user123 | f | 2025-03-18 19:43:54.357697 | 2025-03-18 19:43:54.357697

(3 rows) 
Now changed with hash 
coding_review_db=# SELECT * FROM users;
 id | username |      email      |                           password                           | isadmin |         created_at         |         updated_at         
----+----------+-----------------+--------------------------------------------------------------+---------+----------------------------+----------------------------
  1 | admin    | admin@gmail.com | $2b$10$ppy2xnCJxr.0ehmh9Lv0febXHLiLFkO5/xi7wXdLk8XSHNK8y.2T2 | t       | 2025-03-20 18:41:17.337918 | 2025-03-20 18:41:17.337918
  2 | user1    | user1@gmail.com | $2b$10$k94VglTvB7rmaUztyQHql.EafAM9Wtyw9TLom6eZZuootys8FnTVK | f       | 2025-03-20 18:41:17.337918 | 2025-03-20 18:41:17.337918
  3 | user2    | user2@gmail.com | $2b$10$KXV9jmQ.i3EDJYO1PA5P9uKAVPWWPebYNGH9OtXlPR3N8Y0Cxyu5q | f       | 2025-03-20 18:41:17.337918 | 2025-03-20 18:41:17.337918
(3 rows)

coding_review_db=# SELECT \* FROM resources;
id | title | type | language | link | description | product_id | created_at | updated_at  
----+----------------------------+---------+------------+--------------------------------+---------------------------------------+------------+----------------------------+----------------------------
1 | Introduction to JavaScript | video | JavaScript | https://example.com/js-intro | Learn the basics of JavaScript. | 1 | 2025-03-18 23:09:41.974996 | 2025-03-18 23:09:41.974996
2 | Eloquent JavaScript | book | JavaScript | https://eloquentjavascript.net | A great book for learning JavaScript. | 2 | 2025-03-18 23:09:41.974996 | 2025-03-18 23:09:41.974996
3 | React Tutorial | article | JavaScript | https://reactjs.org/tutorial | Official React tutorial. | 3 | 2025-03-18 23:09:41.97499
6 | 2025-03-18 23:09:41.974996
(3 rows)

coding_review_db=# SELECT \* FROM reviews;
id | user_id | resource_id | rating | comment | created_at | updated_at  
----+---------+-------------+--------+------------------------+----------------------------+----------------------------
1 | 2 | 1 | 5 | Great video! | 2025-03-18 23:09:41.975992 | 2025-03-18 23:09:41.975992
2 | 3 | 2 | 4 | Very informative book. | 2025-03-18 23:09:41.975992 | 2025-03-18 23:09:41.975992
3 | 2 | 3 | 5 | Excellent tutorial. | 2025-03-18 23:09:41.975992 | 2025-03-18 23:09:41.975992
(3 rows)

coding_review_db=# SELECT \* FROM favorites;
id | user_id | resource_id
----+---------+-------------
1 | 2 | 1
2 | 3 | 2
3 | 2 | 3


Front end deployment : https://gorgeous-sopapillas-390e00.netlify.app/
Back end deployment : 