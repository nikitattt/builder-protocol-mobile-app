import SharedGroupPreferences from 'react-native-shared-group-preferences'

//TODO: move to cental config
const daosAppGroup = 'group.com.nouns.ng.builder.daos'

export const sharedGroupStorage = {
  setItem: async (key: string, value: any, appGroup: string) => {
    try {
      return await SharedGroupPreferences.setItem(key, value, appGroup)
    } catch (error) {
      //TODO: show error to user and undo changes in zustand
      console.error('Error setting item in shared group storage:', error)
    }
  },
  getItem: async (key: string, appGroup: string): Promise<any | null> => {
    try {
      return await SharedGroupPreferences.getItem(key, appGroup)
    } catch (error) {
      console.error('Error getting item from shared group storage:', error)
      return null
    }
  }
}

export const daosGroupStorage = {
  setItem: async (key: string, value: any) =>
    sharedGroupStorage.setItem(key, value, daosAppGroup),
  getItem: async (key: string): Promise<any | null> =>
    sharedGroupStorage.getItem(key, daosAppGroup)
}