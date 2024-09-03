type SignInCredentials = { email: string };
type SignUpCredentials = { firstName: string; lastName: string; email: string };

export interface StoreMethods {
  signOut: () => void;
  signIn: (credentials: SignInCredentials) => Promise<any>;
  signUp: (credentials: SignUpCredentials) => Promise<any>;
  getSubjects: () => Promise<any>;
  startSubject: (subjectId: number) => Promise<any>;
  completeLesson: (lessonId: number) => Promise<any>;
  getLearners: (subjectId: number) => Promise<any>;
}
