import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StoreMethods } from "./interface";
import { StoreState, SubjectLearner } from "./types";
import { APP_ID, BASE_URL } from "../utils/constants";
import { http } from "../utils/https";
import { initialStore } from "../utils/helpers";
import { AxiosResponse } from "axios";
import { useForm } from "../hooks/useForm";

export const useStore = create<StoreState & StoreMethods>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialStore,

        signOut: () => {
          set({
            ...initialStore,
          });
        },

        signIn: async (credentials) => {
          try {
            const req = new http(BASE_URL);
            return await req
              .post("/auth/sign-in", credentials)
              .then((resp: AxiosResponse) => {
                const respData = http.responseBody(resp).data;
                set({
                  user: respData.user,
                  token: respData.token,
                });
                return resp;
              });
          } catch (error: any) {
            useForm.getState().setErrors(error.response.data.errors);
            throw new Error(error.response.data.message);
          }
        },

        signUp: async (credentials) => {
          try {
            const req = new http(BASE_URL);
            return await req
              .post("/auth/sign-up", credentials)
              .then((resp: AxiosResponse) => {
                const respData = http.responseBody(resp).data;
                set({
                  user: respData.user,
                  token: respData.token,
                });
                return resp;
              });
          } catch (error: any) {
            useForm.getState().setErrors(error.response.data.errors);
            throw new Error(error.response.data.message);
          }
        },

        getSubjects: async () => {
          try {
            const req = new http(BASE_URL, {
              authorization: `Bearer ${get().token}`,
            });
            return await req.get("/subjects").then((res) => {
              res = http.responseBody(res).data;

              set({
                allSubjects: res.allSubjects,
                mySubjects: res.mySubjects,
              });
            });
          } catch (error) {
            console.log(error);
          }
        },

        startSubject: async (subjectId) => {
          try {
            const req = new http(BASE_URL, {
              authorization: `Bearer ${get().token}`,
            });
            return await req
              .post(`/subjects/${subjectId}/start`, {})
              .then(async () => {
                await get().getSubjects();
                return;
              });
          } catch (error) {
            console.log(error);
          }
        },

        completeLesson: async (lessonId) => {
          try {
            const req = new http(BASE_URL, {
              authorization: `Bearer ${get().token}`,
            });
            return await req
              .post(`/lessons/${lessonId}/complete`, {})
              .then(async () => {
                await get().getSubjects();
                return;
              });
          } catch (error) {
            console.log(error);
          }
        },

        getLearners: async (subjectId) => {
          try {
            const req = new http(BASE_URL, {
              authorization: `Bearer ${get().token}`,
            });
            return await req
              .get(`/subjects/${subjectId}/learners`)
              .then((res) => {
                const subjectLearners = http.responseBody(res)
                  .data as SubjectLearner[];

                // sort learners by lessons completed
                subjectLearners.sort(
                  (a, b) =>
                    b.lessons.filter((l) => l.completed === true).length -
                    a.lessons.filter((l) => l.completed === true).length
                );

                set({
                  subjectLearners,
                });
              });
          } catch (error) {
            console.log(error);
          }
        },
      }),
      {
        name: `${APP_ID}.simple-learning-app:store`,
      }
    )
  )
);
