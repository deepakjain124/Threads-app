import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  loggedIn: false,
  contactList:[],
  AuthorizeUser:()=>set((state)=>({loggedIn:!state.loggedIn})),
  setContactList:(data)=>set((state)=>({contactList:data}))
}))