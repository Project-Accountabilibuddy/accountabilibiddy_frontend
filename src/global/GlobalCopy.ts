type UserChosenCopySeverity =
  | 'DRILL_SEARGENT'
  | 'CATHOLIC_NUN'
  | 'SUNDAY_SCHOOL_TEACHER'

interface GlobalCopy {
  LANDING_TITLE: {
    [key in UserChosenCopySeverity]: string
  }
}

const GLOBAL_COPY: GlobalCopy = {
  LANDING_TITLE: {
    DRILL_SEARGENT: 'Get ready to be punished',
    CATHOLIC_NUN: 'Welcome to a struggle worthy of you',
    SUNDAY_SCHOOL_TEACHER: 'You are about to be taught a lesson'
  }
  //   LANDING_PARAGRAPH: {
  //     DRILL_SEARGENT: 'Drill Sergeant',
  //     CATHOLIC_NUN: 'Catholic Nun',
  //     SUNDAY_SCHOOL_TEACHER: 'Sunday School Teacher'
  //   }
}

export default GLOBAL_COPY
