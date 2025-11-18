'use client';
import React from 'react'
import { useUserStore } from '../login/userStore';
type Props = {}

export  function UserStorehelper() {
    let username = useUserStore((state) => state.username);

  return  username;
}