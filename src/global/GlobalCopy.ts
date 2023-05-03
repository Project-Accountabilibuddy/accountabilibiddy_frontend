export type UserChosenCopySeverity =
  | 'DRILL_SEARGENT'
  | 'CATHOLIC_NUN'
  | 'SUNDAY_SCHOOL_TEACHER'

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface GlobalCopy {
  [key: string]: {
    [key in UserChosenCopySeverity]: string
  }
}

const GLOBAL_COPY: GlobalCopy = {
  LANDING_TITLE: {
    DRILL_SEARGENT: 'Get ready to be punished',
    CATHOLIC_NUN: 'Welcome to a struggle worthy of you',
    SUNDAY_SCHOOL_TEACHER: 'You are about to be taught a lesson'
  },
  LANDING_PARAGRAPH: {
    DRILL_SEARGENT: `
    In today's “safe” society motivation rarely comes from external
    sources, it must come from within. Billibuddy can not motivate you.
    However, it might help you inspire yourself to achieve something you
    have always wanted to make happen.
    `,
    CATHOLIC_NUN: 'Catholic Nun',
    SUNDAY_SCHOOL_TEACHER: 'Sunday School Teacher'
  }
}

export default GLOBAL_COPY
