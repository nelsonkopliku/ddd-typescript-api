CREATE TABLE IF NOT EXISTS nodes (
    id VARCHAR (36), -- maybe should be something like BINARY or similar
    cluster VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    is_powered_on BOOLEAN DEFAULT 0,
    UNIQUE (cluster, `name`),
    FULLTEXT idx_node_fulltext(`name`),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

INSERT INTO nodes (
    id,
    cluster,
    `name`,
    is_powered_on
) VALUES
('dfa7b991-4e02-4fd5-960b-c63899757b83', 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f', 'node-01', 0),
('e53942ee-4bbe-4027-b2fc-afd18c26c20f', 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f', 'node-02', 1),
('161c3c62-a3ca-480f-8035-40e340e4ed4c', 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f', 'node-03', 1),
('a32532b3-f8f6-4563-8562-0ae313a24563', 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f', 'node-04', 0),
('16e2ef00-daa4-4346-b672-4c7b0e86f2f4', 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f', 'node-05', 1),
('4d8af223-f3e0-4cfc-9936-63226bad0941', 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f', 'node-06', 0),
('eba84c8b-d530-44bf-b341-067b76a17bdc', 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb', 'node-01', 1),
('0dd7c8a2-b78e-4375-a155-42544b6f6acd', 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb', 'node-02', 1),
('417db5fc-397a-47ad-869f-4ab65f43a807', 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb', 'node-03', 0),
('30f7e626-e771-4a93-8552-34addd769b42', 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb', 'node-04', 0),
('887229ac-e483-4273-961e-fb523fe68ac3', 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb', 'node-05', 1),
('bb9e1bd9-a558-4c73-af26-4f50df473ffe', 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb', 'node-06', 1);