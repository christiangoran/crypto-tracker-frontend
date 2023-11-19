import { rest } from "msw";

const baseUrl = "https://crypto-tracker-heroku-b5acda38c706.herokuapp.com/";

export const handlers = [
  rest.get(`${baseUrl}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "christiangoran",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://res.cloudinary.com/dzw4z92rn/image/upload/v1/media/images/profile_yc4ebw",
      })
    );
  }),
  rest.post(`${baseUrl}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
