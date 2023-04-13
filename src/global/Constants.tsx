enum ROUTES {
  LANDING = '/',
  AUTH = '/auth',
  PROJECT = '/project',
  PROJECT_SETUP = '/project-setup',
  QUOTES = '/quotes'
}

enum SUB_ROUTES {
  PROJECT_NAME = 'project-name',
  WHAT_LONG_FORM = 'what-long-form',
  WHY_LONG_FORM = 'why-long-form',
  WHY_SHORT_FORM = 'why-short-form',
  HATERS_LONG_FORM = 'haters-long-form',
  HATERS_SHORT_FORM = 'haters-short-form',
  SACRIFICES_LONG_FORM = 'sacrifices-long-form',
  WEEKS_EXPECTED_TO_COMPLETE = 'weeks-expected-to-complete'
}

export { SUB_ROUTES, ROUTES }
