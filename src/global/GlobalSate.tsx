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

  userResponseWhyLongForm:
    "Mereth loose speed splendor strongest trust? Giving Dragon-Slayer cheekbones thirsty tracking nightshade? Ensnare liable shaken beg approaching sooner invitations Gandalf went. Watchtower Dunland secretive reason. These barley months employment touch Morgul-rats available manner. Gandalf the Grey inform defeat fortune tradition half-wits advance. Andûril amazing amongst. Twitching Orcrist starve struggle small anchored toy-makers woodlands. Angmar sponge launching sometimes charge! There and Back Again. A Hobbit's Tale.",
  setUserResponseWhyLongForm: (userResponseWhyLongForm) =>
    set(() => ({ userResponseWhyLongForm })),

  userResponseWhyShortForm: "",
  setUserResponseWhyShortForm: (userResponseWhyShortForm) =>
    set(() => ({ userResponseWhyShortForm })),

  userResponseHattersLongForm:
    "Remarked Isen getting 21 handle probably. Troublemaker cowards Prancing Pony? Counts token funny Celeborn ambushed smithy's pot farmer? Outscoring Azog stop withdraw grumpy you've finish. Gandalf's death was not in vain. Nor would he have you give up hope. Dampens Elven spreads listened bidden. Disturbing while crooked tinkers badly any hearts Arwen's lessened! Kingdoms Númenor l rock wrong prize tomatoes riding or niece kingly gifted?",
  setUserResponseHattersLongForm: (userResponseHattersLongForm) =>
    set(() => ({ userResponseHattersLongForm })),

  userResponseHattersShortForm: "",
  setUserResponseHattersShortForm: (userResponseHattersShortForm) =>
    set(() => ({ userResponseHattersShortForm })),

  userResponseWeeksToAccomplish: 1,
}));

export default useGlobalState;
