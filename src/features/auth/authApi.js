
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled, }) {
                try {

                    const result = await queryFulfilled;
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        // user: result.data.user
                    }));

                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        // user: result.data.user
                    }))

                } catch (error) {

                }

            }
        }),
        login: builder.mutation({

            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled, }) {
                try {

                    const result = await queryFulfilled;
                    console.log("result", result);
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        // user: result.data.user
                    }));

                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        // user: result.data.user
                    }))


                } catch (error) {

                }

            }
        })
    })
})

export const { useRegisterMutation, useLoginMutation } = authApi;