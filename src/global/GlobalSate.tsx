import create from "zustand";

interface GlobalState {
  userResponseWhatLongForm: string;
  userResponseSacrificeLongForm: string;
  projectName: string;
  userResponseWhyLongForm: string;
  userResponseWhyShortForm: string;
  userResponseHattersLongForm: string;
  userResponseHattersShortForm: string;

  setUserResponseWhatLongForm: (userResponseWhatLongForm: string) => void;
  setUserResponseSacrificeLongForm: (
    userResponseSacrificeLongForm: string
  ) => void;
  setProjectName: (projectName: string) => void;
  setUserResponseWhyLongForm: (userResponseWhyLongForm: string) => void;
  setUserResponseWhyShortForm: (userResponseWhyShortForm: string) => void;
  setUserResponseHattersLongForm: (userResponseHattersLongForm: string) => void;
  setUserResponseHattersShortForm: (
    userResponseHattersShortForm: string
  ) => void;
}

const useGlobalState = create<GlobalState>((set) => ({
  userResponseWhatLongForm: "",
  setUserResponseWhatLongForm: (userResponseWhatLongForm) =>
    set(() => ({ userResponseWhatLongForm })),

  userResponseSacrificeLongForm: "",
  setUserResponseSacrificeLongForm: (userResponseSacrificeLongForm) =>
    set(() => ({ userResponseSacrificeLongForm })),

  projectName: "Salsa Champ",
  setProjectName: (projectName) => set(() => ({ projectName })),

  userResponseWhyLongForm: "",
  setUserResponseWhyLongForm: (userResponseWhyLongForm) =>
    set(() => ({ userResponseWhyLongForm })),

  userResponseWhyShortForm: "",
  setUserResponseWhyShortForm: (userResponseWhyShortForm) =>
    set(() => ({ userResponseWhyShortForm })),

  userResponseHattersLongForm: "",
  setUserResponseHattersLongForm: (userResponseHattersLongForm) =>
    set(() => ({ userResponseHattersLongForm })),

  userResponseHattersShortForm: "",
  setUserResponseHattersShortForm: (userResponseHattersShortForm) =>
    set(() => ({ userResponseHattersShortForm })),

  userResponseWeeksToAccomplish: 1,
}));

export default useGlobalState;
