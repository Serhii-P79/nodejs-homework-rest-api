const { describe, expect, test } = require("@jest/globals");
// const jest = require("@jest/globals");

const userLogin = require("./login");

const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("test login User", () => {
  test("проверка регистрации пользователя", async () => {
    User.findOne = jest.fn((data) => {
      return data;
    });

    bcrypt.compare = jest.fn(() => {
      return true;
    });

    jwt.sign = jest.fn(() => {
      return "fdghsadkfjghsdkjfghsdkjlfghsdlkjfghsdklfjghsdklfjghsdklfjghsdklfjgh";
    });

    User.findByIdAndUpdate = jest.fn((data) => {
      return {
        token: "fdghsadkfjghsdkjfghsdkjlfghsdlkjfghsdklfjghsdklfjghsdklfjghsdklfjgh",
        email: "updUser.email",
        subscription: "updUser.subscription",
      };
    });

    const req = {};
    req.body = {
      password: "asdfgh",
      email: "asdfgh@com.ua",
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => {
        return {
          status: 200,
          body: { ...data },
        };
      }),
    };

    const result = await userLogin(req, res);

    // console.log(result);

    const { status, body } = result; //!  body - тело ответа, status - статус ответа

    expect(status).toBe(200); //* -  проверка статуса
    expect(Object.keys(body).includes("token")).toBe(true); //* - проверка ключа 'token'
    expect(body.user !== undefined).toBe(true); //* проверка наличия объекта user
    expect(Object.keys(body.user).includes("email")).toBe(true); //* проверка наличия у объекта user поля email
    expect(Object.keys(body.user).includes("subscription")).toBe(true); //* проверка наличия у объекта user поля subscription
    expect(typeof body.user.email).toBe("string"); //* проверка типа поля email
    expect(typeof body.user.subscription).toBe("string"); //* проверка типа поля subscription
  });
});
