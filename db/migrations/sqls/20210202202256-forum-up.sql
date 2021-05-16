-- categories table
CREATE TABLE forum_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    title varchar(40) NOT NULL,
    description varchar(200) NOT NULL,
    icon varchar(40) NOT NULL,
    "userId" uuid NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    active boolean DEFAULT TRUE,
    created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamptz
);

-- topics table
CREATE TABLE forum_topics (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "categoryId" uuid NOT NULL REFERENCES forum_categories (id) ON DELETE RESTRICT,
    title varchar(100) NOT NULL,
    description varchar(400),
    views integer DEFAULT 0,
    "userId" uuid NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    active boolean DEFAULT TRUE,
    created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamptz
);

-- posts table
CREATE TABLE forum_posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "topicId" uuid NOT NULL REFERENCES forum_topics (id) ON DELETE RESTRICT,
    "replyId" uuid REFERENCES forum_posts (id) ON DELETE RESTRICT,
    content varchar(10000) NOT NULL,
    "userId" uuid NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    active boolean DEFAULT TRUE,
    created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamptz
);

