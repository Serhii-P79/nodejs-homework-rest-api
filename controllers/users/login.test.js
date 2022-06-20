//! Условие работы теста --- сервер должен быть предварительно запущен
//! пользователь должен быть предварительно зарегистрирован с паролем:asdfgh и почтой:asdfgh@com.ua

const request = require("supertest");
const { describe, expect, test } = require("@jest/globals");
const { PORT = 3000 } = process.env;

describe("test login User", () => {
  test("проверка регистрации пользователя", async () => {
    // ! - запрос на сервер
    const response = await request(`http://localhost:${PORT}`)
      .post("/api/users/login")
      .send({ password: "asdfgh", email: "asdfgh@com.ua" })
      .set("Accept", "application/json");
    // ! - в response - ответ сервера

    const { status, _body: body } = response; //!  body - тело ответа, status - статус ответа

    expect(status).toBe(200);
    expect(Object.keys(body).includes("token")).toBe(true);
    expect(body.user !== undefined).toBe(true);
    expect(Object.keys(body.user).includes("email")).toBe(true);
    expect(Object.keys(body.user).includes("subscription")).toBe(true);
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
