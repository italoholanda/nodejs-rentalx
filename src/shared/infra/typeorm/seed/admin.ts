import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "..";

const create = async () => {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("nimda", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driverLicense") 
    values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'abcdefghi')
    `
  );
};

create().then(() => console.log("Admin account created."));
