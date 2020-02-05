// @ts-nocheck

import { message } from "antd";

export const getWalletsHistory = (): Array<any> | null => {
  try {
    let history = localStorage.getItem("history");
    history = JSON.parse(history);
    return history;
  } catch (error) {
    console.log(error);
  }
};

export const addToHistory = (
  address: string,
  link: string,
  seed: string,
  password: string | null
) => {
  try {
    let history = getWalletsHistory();
    if (!history) history = [];
    if (history.length > 9) history.splice(-1,1);
    console.log(history);
    history.unshift({ address, link, seed, date: Date.now(), password });
    localStorage.setItem("history", JSON.stringify(history));
  } catch (error) {
    message.error("Error while adding walet yo your history");
  }
};

export const clearHistory = () => {
  localStorage.removeItem('history')
}