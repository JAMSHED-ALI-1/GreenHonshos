import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('@user', jsonValue);
  } catch (e) {
    console.error('Error storing user:', e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving user:', e);
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('@user');
  } catch (e) {
    console.error('Error clearing user:', e);
  }
};


const TASKS_STORAGE_KEY = '@tasks';

export const storeTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error storing tasks:', e);
  }
};

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error retrieving tasks:', e);
  }
};
