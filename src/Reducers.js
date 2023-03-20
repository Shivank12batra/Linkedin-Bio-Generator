import { useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_NAME":
      case "CHANGE_TITLE":
      case "CHANGE_INDUSTRY":
      case "CHANGE_EXPERIENCE":
      case "CHANGE_EDUCATION":
      case "CHANGE_SKILLS":
      case "CHANGE_STYLE":
      case "CHANGE_TONE":
      case "CHANGE_FACT":
      case "CHANGE_RESPONSE":
      case "CHANGE_IDX":
      case "CHANGE_BIO":
        console.log(action.payload)
        return { ...state, [action.type.split("_")[1].toLowerCase()]: action.payload };
      default:
        return state;
    }
  };
  

const inputState = {
    name: "",
    title: "",
    industry: "",
    experience: 0,
    education: "",
    skills: "",
    style: "concise",
    tone: "simple",
    fact: "",
    response: "",
    idx: 0,
    bio: "",
}

export const FormState = () => {
    const [state, dispatch] = useReducer(formReducer, inputState);
    return {state, dispatch}
};