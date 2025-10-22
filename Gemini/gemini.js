import {GoogleGenerativeAi} from 'https://esm.run/@google/generative-ai';

const API_KEY = 'AIzaSyBE_-M7mytZn6kxM8FmGIzoPU2OW1DF6Aw'
const MODEL_NAME = 'gemini-2.5-flash';
const generative_botton = document.getElementById("generate-button");
const promptInput = document.getElementById("prompt-input");
const storyOutput = document.getElementById("story-output")