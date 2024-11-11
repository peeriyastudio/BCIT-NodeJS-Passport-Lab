const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
}

const database: Express.User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
    // githubId: "",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "basic",
    // githubId: "",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "basic",
    // githubId: "",
  },
];

const userModel = {

  /* Fixed 😊 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email); // This line can be replaced with real SQL database
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* Fixed 😊 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByGitHubId: (githubId: string) => {
    const user = database.find((user) => user.githubId === githubId);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with githubId: ${githubId}`);
  },
};

export { ROLE, database, userModel };
