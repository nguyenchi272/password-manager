let users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123456",
  },
];

function generateToken(userId: number) {
  return `fake-token-${userId}-${Date.now()}`;
}

export const mockServer = {
  login: async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 400));

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Invalid email or password");

    return {
      token: generateToken(user.id),
      user: { id: user.id, email: user.email },
    };
  },

  register: async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 400));

    const exists = users.some((u) => u.email === email);
    if (exists) throw new Error("Email already exists");

    const newUser = {
      id: users.length + 1,
      email,
      password,
    };

    users.push(newUser);

    return {
      token: generateToken(newUser.id),
      user: { id: newUser.id, email: newUser.email },
    };
  },

  getUser: async (token: string) => {
    if (!token || !token.startsWith("fake-token-"))
      throw new Error("Invalid token");

    const userId = Number(token.split("-")[2]);
    const user = users.find((u) => u.id === userId);

    if (!user) throw new Error("User not found");

    return { id: user.id, email: user.email };
  },
};
