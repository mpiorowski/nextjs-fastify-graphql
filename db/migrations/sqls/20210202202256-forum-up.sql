-- categories table
CREATE TABLE forum_categories (
    title varchar(40) NOT NULL,
    description varchar(200) NOT NULL,
    icon varchar(40) NOT NULL,
    userid integer NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    id serial PRIMARY KEY UNIQUE,
    uid uuid DEFAULT uuid_generate_v4 () UNIQUE,
    version int DEFAULT 1,
    active boolean DEFAULT TRUE,
    deleted boolean DEFAULT FALSE,
    created timestamptz NOT NULL DEFAULT now(),
    updated timestamptz NOT NULL DEFAULT now()
);

-- topics table
CREATE TABLE forum_topics (
    title varchar(100) NOT NULL,
    description varchar(400),
    views integer DEFAULT 0,
    categoryid integer NOT NULL REFERENCES forum_categories (id) ON DELETE RESTRICT,
    userid integer NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    id serial PRIMARY KEY UNIQUE,
    uid uuid DEFAULT uuid_generate_v4 () UNIQUE,
    version int DEFAULT 1,
    active boolean DEFAULT TRUE,
    deleted boolean DEFAULT FALSE,
    created timestamptz NOT NULL DEFAULT now(),
    updated timestamptz NOT NULL DEFAULT now()
);

-- posts table
CREATE TABLE forum_posts (
    content varchar(10000) NOT NULL,
    replyid integer REFERENCES forum_posts (id) ON DELETE RESTRICT,
    topicid integer NOT NULL REFERENCES forum_topics (id) ON DELETE RESTRICT,
    userid integer NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    id serial PRIMARY KEY UNIQUE,
    uid uuid DEFAULT uuid_generate_v4 () UNIQUE,
    version int DEFAULT 1,
    active boolean DEFAULT TRUE,
    deleted boolean DEFAULT FALSE,
    created timestamptz NOT NULL DEFAULT now(),
    updated timestamptz NOT NULL DEFAULT now()
);

