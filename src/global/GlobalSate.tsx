import create from "zustand";

interface WeeksResponse {
  weeksGoals: string;
  lastWeeksReview: string;
}

interface GlobalState {
  userResponseWhatLongForm: string;
  userResponseSacrificeLongForm: string;
  projectName: string;
  userResponseWhyLongForm: string;
  userResponseWhyShortForm: string[];
  userResponseHattersLongForm: string;
  userResponseHattersShortForm: string;

  weekResponseFeed: WeeksResponse[];
  setWeekResponseFeed: (weeksResponse: WeeksResponse) => void;

  setUserResponseWhatLongForm: (userResponseWhatLongForm: string) => void;
  setUserResponseSacrificeLongForm: (
    userResponseSacrificeLongForm: string
  ) => void;
  setProjectName: (projectName: string) => void;
  setUserResponseWhyLongForm: (userResponseWhyLongForm: string) => void;

  updateResponseWhyShortFormNumberOfResponses: (removeOrAdd: string) => void;
  setUserResponseWhyShortForm: (
    userResponseWhyShortForm: string,
    index: number
  ) => void;
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

  userResponseWhyLongForm:
    "Mereth loose speed splendor strongest trust? Giving Dragon-Slayer cheekbones thirsty tracking nightshade? Ensnare liable shaken beg approaching sooner invitations Gandalf went. Watchtower Dunland secretive reason. These barley months employment touch Morgul-rats available manner. Gandalf the Grey inform defeat fortune tradition half-wits advance. Andûril amazing amongst. Twitching Orcrist starve struggle small anchored toy-makers woodlands. Angmar sponge launching sometimes charge! There and Back Again. A Hobbit's Tale.",
  setUserResponseWhyLongForm: (userResponseWhyLongForm) =>
    set(() => ({ userResponseWhyLongForm })),

  userResponseWhyShortForm: ["TODO: SOME MOTIVATING FADE IN/OUT TEXT", "", ""],
  updateResponseWhyShortFormNumberOfResponses: (removeOrAdd) => {
    set((state) => {
      if (removeOrAdd === "ADD") {
        return {
          userResponseWhyShortForm: [...state.userResponseWhyShortForm, ""],
        };
      }
      if (removeOrAdd === "REMOVE") {
        return {
          userResponseWhyShortForm: state.userResponseWhyShortForm.slice(1),
        };
      }
      return state;
    });
  },

  setUserResponseWhyShortForm: (userResponseWhyShortForm, index) =>
    set((state) => ({
      userResponseWhyShortForm: state.userResponseWhyShortForm.map(
        (item, i) => (i === index ? userResponseWhyShortForm : item),
        []
      ),
    })),

  userResponseHattersLongForm:
    "Remarked Isen getting 21 handle probably. Troublemaker cowards Prancing Pony? Counts token funny Celeborn ambushed smithy's pot farmer? Outscoring Azog stop withdraw grumpy you've finish. Gandalf's death was not in vain. Nor would he have you give up hope. Dampens Elven spreads listened bidden. Disturbing while crooked tinkers badly any hearts Arwen's lessened! Kingdoms Númenor l rock wrong prize tomatoes riding or niece kingly gifted?",
  setUserResponseHattersLongForm: (userResponseHattersLongForm) =>
    set(() => ({ userResponseHattersLongForm })),

  userResponseHattersShortForm: "",
  setUserResponseHattersShortForm: (userResponseHattersShortForm) =>
    set(() => ({ userResponseHattersShortForm })),

  userResponseWeeksToAccomplish: 1,
  weekResponseFeed: [],
  setWeekResponseFeed: (weeksResponse) =>
    set((state) => ({
      weekResponseFeed: [...state.weekResponseFeed, weeksResponse],
    })),
}));

export default useGlobalState;
