BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS attend CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    pic text,
    date date NOT NULL,
    descr text NOT NULL
);

CREATE TABLE attend (
    id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) references users (id),
    event_id int NOT NULL,
    FOREIGN KEY (event_id) references events (id)
);
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) references users (id),
    event_id int NOT NULL,
    FOREIGN KEY (event_id) references events (id),
    comtext text NOT NULL
);
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) references users (id),
    event_id int NOT NULL,
    FOREIGN KEY (event_id) references events (id),
    revtext text NOT NULL
);

INSERT INTO users (username, password) VALUES
    ('lina', 'almajd'),
    ('ivan', 'naz'),
    ('rabea', 'haifa'),
    ('fake', 'fake');

INSERT INTO events (title,pic,date,descr) VALUES
    ('Salesforce bullshit day','https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Salesforce_logo.svg/1200px-Salesforce_logo.svg.png','02-02-2020','A Hijje to go home early'),
    ('Oracle day','https://ir0.mobify.com/project-oss-www-fujitsu-com/c8/webp80/1536/https://www.fujitsu.com/il/Images/oracle-db580x224_tcm152-40873.jpg','01-01-2020','A trip to petah tikva'),
    ('Valentines day','https://www.myjewishlearning.com/wp-content/uploads/2003/02/love2-1598x900.jpg','02-12-2020','A Hijje to consume love'),
    ('Fatmeeh Birthday','https://cdn.mos.cms.futurecdn.net/vChK6pTy3vN3KbYZ7UU7k3-1200-80.jpg','03-07-2020','The only real celebration');

INSERT INTO attend (user_id,event_id) VALUES
    (2,2),(3,2),(1,2),(2,4),(4,2),(4,1),
    (4,3),(4,4),(3,1),(3,4),(1,4),(2,3);

INSERT INTO comments (user_id,event_id,comtext) VALUES
    (2,4,'Happy birthday fatmeeh, 3o2bal el 120 zay el 20 :p'),
    (3,3,'Habal Fade'),
    (1,4,'Mabrok habibte lal 120, lal farha el tame'),
    (2,3,'Yay i can buy teddy bears and hearts and chocolate for my love'),
    (4,3,'Do you believ in lov of first sight');

INSERT INTO reviews (user_id,event_id,revtext) VALUES
    (1,1,'I cant believe you are wasting your time on salesforce!'),
    (1,2,'Oracle day should be a very educating day, keep the good work.'),
    (2,2,'I think it is beseder'),
    (3,1,'It was wooooow i went home and i went to sleep');

COMMIT;